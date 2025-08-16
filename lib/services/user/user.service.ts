import User from "@/lib/models/User";
import { TUser } from "@/types/user/user.type";
import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function signUp({ username, fullName, email, password, bio }: TUser) {
  try {
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    if (existingUser) {
      throw new Error("User with this username or email already exists");
    }
    const hashedPassword = await hash(password, 15);
    const newUser = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
      ...(bio && { bio })
    });

    return newUser;
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
}

type login=Pick<TUser,"email"|"password">
export async function login({ email, password }: login) {
  try {
    const existingUser = await User.findOne({email});
    if (!existingUser) {
      throw new Error("Credentials are pretty much wrong");
    }
    const checkPassword = await compare(password, existingUser.password);
    if(!checkPassword){
        throw new Error("Credentials are pretty much wrong");
    }
    return existingUser;
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("User doesn't exist");
    }
    return deletedUser;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
}

export async function getImage(id: string) {
  try {
    const getUserImage = await User.findById(id);
    if (!getUserImage) {
      throw new Error("User doesn't exist");
    }
    return getUserImage.avatarUrl;
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
}
