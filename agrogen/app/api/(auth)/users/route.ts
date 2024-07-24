import { Types } from "mongoose";
import connect from "../../../../lib/db";
import User from "../../../../lib/models/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Error in fetching users: ${error.message}`, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: "User is created", user: newUser }),
      { status: 201 }  // Use 201 status for a successful resource creation
    );
  } catch (error: any) {
    return new NextResponse(`Error in creating user: ${error.message}`, { status: 500 });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;
    await connect();

    if (!userId || !newUsername) {
      return new NextResponse(
        JSON.stringify({ message: "ID or new username not provided" }),
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid user ID" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "User is updated", user: updatedUser }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(`Error in updating user: ${error.message}`, { status: 500 });
  }
};
export const DELETE = async (request: Request) => {
    try {
      // Parse the URL to extract the user ID from the query parameters
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
  
      await connect();
  
      if (!userId) {
        return new NextResponse(
          JSON.stringify({ message: "User ID not provided" }),
          { status: 400 }
        );
      }
  
      if (!Types.ObjectId.isValid(userId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid user ID" }),
          { status: 400 }
        );
      }
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return new NextResponse(
          JSON.stringify({ message: "User not found" }),
          { status: 404 }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ message: "User deleted successfully" }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse(`Error in deleting user: ${error.message}`, { status: 500 });
    }
  };