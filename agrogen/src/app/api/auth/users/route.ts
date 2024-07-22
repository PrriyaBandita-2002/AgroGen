import { NextResponse } from "next/server"

export const GET=()=>
{
    return new NextResponse("tis my first api");
}