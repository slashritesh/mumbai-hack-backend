import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/customerror.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Manager } from "../models/Manager.js";
import { generateCode5digit } from "../lib/generateCode.js";
import { Employee } from "../models/Employee.js";


export const register = async (req, res, next) => {
  try {
    const { email, password, fullname } = req.body;

    console.log("Request body:", req.body); // it is working

     // Validate input fields
     
    if(!email &&  !password && !fullname){
      return res.status(401).json({ message: "Invalid credentials!!",data : req.body });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "User already exists!!" });
    }

    console.log("Password before hashing:", password); // Debugging

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role: "manager",
      fullname,
    });

    const manager = await Manager.create({
      userid: newUser.id,
      organization_code: generateCode5digit(),
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Manager registered successfully!!",
      organization_code: manager.organization_code,
    });
  
  } catch (error) {
    console.error("Error in register route:", error);
    next(error);
  }
};




export const login = async (req, res, next) => {
  try {
    const { email, password,role } = req.body;

    if (!email && !password) {
      throw new BadRequestError("All fields are required!!");
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new UnauthenticatedError("User Not Found!!");
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials!!");
    }

    if (role === "employee") {
      existingUser.role = "employee"
      await existingUser.save()
    }

    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.cookie("token", accessToken, { httpOnly: true, secure: true });
    res.status(200).json({ message: "Login successful!!" ,role : existingUser.role,accessToken });

  } catch (error) {
    next(error);
  }
};



export const joinAsEmployee = async (req, res,next) => {
  const { organization_code,fullname, email, password } = req.body;

  try {
      // Step 1: Find the manager by organization_code
      const manager = await Manager.findOne({ organization_code });
      if (!manager) {
          return res.status(404).json({ message: "Manager or organization not found." });
      }

      // Step 2: Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User with this email already exists." });
      }

      // Step 3: Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Step 4: Create a new User
      const newUser = new User({
          fullname,
          email,
          password: hashedPassword,
      });
      await newUser.save();

      // Step 5: Create a new Employee linked to the new User
      const newEmployee = await Employee.create({
          userid: newUser._id, // Use the newly created User ID
          department: "IT Department", // Change this based on your logic
          designation: "software engineer", // Default designation
          phone: "000-000-0000", // Change this based on your logic
          joiningDate: new Date(),
      });

      
      // Step 6: Update the manager's employee array
      const updated = await Manager.findByIdAndUpdate(manager._id, {
          $push: { employees: newEmployee._id } // Add the new employee to the manager's list
      });      

      // Respond with the new employee details
      res.status(201).json({
          message: "Employee successfully joined.",
          employee: {
              id: newEmployee._id,
              email: newUser.email,
              organization_code: manager.organization_code // Return the organization code if needed
          }
      });
  } catch (error) {
      next(error)
  }
};


export const currentUser = ()=>{

}

