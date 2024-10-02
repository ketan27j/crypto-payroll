"use server"

import prisma from "@repo/db"
// import bcrypt from "bcrypt"

export async function changeUserPassword(email: string, currentPassword: string, newPassword: string): Promise<boolean> {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return false
    }

    // Check if the current password is correct
    const isCurrentPasswordValid = currentPassword === user.password

    if (!isCurrentPasswordValid) {
      return false
    }

    // Update the user's password in the database
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { password: newPassword },
    })

    return !!updatedUser
  } catch (error) {
    console.error('Error changing user password:', error)
    return false
  }
}
