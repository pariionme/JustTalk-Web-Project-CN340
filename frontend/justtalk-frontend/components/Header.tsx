"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from "next/navigation"

export function Header() {
    const router = useRouter()
    const pathname = usePathname() // ดึง pathname ปัจจุบัน

    // ตัวแปรตัวอย่างสำหรับสถานะการล็อกอิน
    const isLoggedIn = false
    const showBackButton = pathname !== "/"

    return (
        <header className="bg-cream">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4">
            <Link
            href="/"
            className="font-serif text-4xl font-light italic text-black"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.25)" }}
            >
            JustTalk
            </Link>

            {isLoggedIn ? ( // เช็คว่า login ยัง ซึ่งตอนนี้ยังทำไม่ได้แฮะๆๆ ทำไมวะ
            <div className="flex gap-3">
                <Button className="rounded-full bg-brown px-6 py-3 text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors">
                CREATE POST
                </Button>
                <Button variant="outline" className="rounded-full bg-brown px-6 text-white tracking-widest hover:bg-[#785657] transition-colors">
                SIGN OUT
                </Button>
            </div>
            ) : showBackButton ? ( // แสดงปุ่ม BACK ถ้าไม่ใช่หน้าแรก == ใช้ได้แระ
                <button
                  type="button"
                  onClick={() => router.back()} // ใช้ router.back() เพื่อกลับไปหน้าก่อนหน้า
                  className="rounded-full px-6 py-3 bg-brown text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors"
                >
                  BACK
                </button>
            ) : (
                <Link href="/signin">
                <Button className="rounded-full bg-brown px-6 py-3 text-white text-sm font-medium tracking-widest hover:bg-[#785657] transition-colors">
                    SIGN IN
                </Button>
                </Link>
            )}
        </div>
        </header>
    )
    }