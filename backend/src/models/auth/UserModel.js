import mongoose from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        require: [true, "Please provide your name"],
    },
    email: {
        type: String,
        require: [true, "Please an email"],
        unique: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please add a valid email"]
    },
    password: {
        type: String,
        require: [true, "Please add password"],
    },
    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/70113620?s=400&u=4d478bacbb9003703f4e8b9f223997e5f15dc3fb&v=4",
    },
    bio: {
        type: String,
        default: "I am a new user",
    },
    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },    
}, {timestamps: true, minimize: true});

//hash the password before saving
UserSchema.pre("save", async function(next) {
    //check if the password is not modified
    if (!this.isModified("password")){
        return next();
    }
    
    //hash the password ==> bcrypt
    //generate salt
    const salt = await bcrypt.genSalt(10);
    //hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    //set the password to the hashed password
    this.password = hashedPassword;

    //call the next middleware
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;