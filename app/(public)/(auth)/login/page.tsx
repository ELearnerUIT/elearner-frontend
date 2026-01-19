import { Eye, Lock, Mail } from "lucide-react";
import LoginForm from "@/components/LoginRegister/LoginForm";

export default function Login() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[rgba(99,102,241,0.05)] via-[rgba(139,92,246,0.05)] to-[rgba(16,185,129,0.05)] flex items-center justify-center p-5">
            <LoginForm />
        </div>
    )
}