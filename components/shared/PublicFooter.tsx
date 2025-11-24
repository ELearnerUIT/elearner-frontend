import Link from "next/link";
import { Hexagon, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const PublicFooter = () => {
    const socialLinks = [
        { icon: FaFacebook, href: "https://facebook.com" },
        { icon: FaInstagram, href: "https://instagram.com" },
        { icon: FaLinkedin, href: "https://linkedin.com" },
        { icon: FaYoutube, href: "https://youtube.com" },
    ];

    return (
        <div className="bg-base-200 text-base-content font-sans">
            <footer className="footer p-10 max-w-7xl mx-auto">
                <aside className="max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="text-primary">
                            <Hexagon className="w-10 h-10 fill-current" />
                        </div>
                        <span className="text-2xl font-bold text-primary tracking-tight">
                            ELearner
                        </span>
                    </div>

                    <p className="opacity-75 mb-4">
                        Learn anything, anytime, anywhere. Join millions of
                        learners worldwide and advance your career with
                        expert-led courses.
                    </p>

                    <div className="flex flex-col gap-2 text-sm opacity-75">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>123 Innovation Dr, Tech City, USA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>contact@elearner.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                    </div>
                </aside>

                <nav>
                    <h6 className="footer-title opacity-100 text-primary">
                        Connect
                    </h6>
                    <div className="grid grid-flow-col gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    className="btn btn-ghost btn-square btn-sm hover:text-primary transition-colors"
                                >
                                    <Icon className="w-5 h-5" />
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                <nav>
                    <h6 className="footer-title opacity-100 text-primary">
                        Company
                    </h6>
                    <Link href="/about" className="link link-hover">
                        About Us
                    </Link>
                    <Link href="/careers" className="link link-hover">
                        Careers
                    </Link>
                    <Link href="/blog" className="link link-hover">
                        Blog
                    </Link>
                    <Link href="/press" className="link link-hover">
                        Press
                    </Link>
                </nav>

                <nav>
                    <h6 className="footer-title opacity-100 text-primary">
                        Legal
                    </h6>
                    <Link href="/terms" className="link link-hover">
                        Terms of Service
                    </Link>
                    <Link href="/privacy" className="link link-hover">
                        Privacy Policy
                    </Link>
                    <Link href="/cookie" className="link link-hover">
                        Cookie Policy
                    </Link>
                    <Link href="/accessibility" className="link link-hover">
                        Accessibility
                    </Link>
                </nav>
            </footer>

            <footer className="footer footer-center p-4 border-t border-base-300 text-base-content opacity-75">
                <aside>
                    <p>© 2025 ELearner, Inc. All rights reserved.</p>
                </aside>
            </footer>
        </div>
    );
};

export default PublicFooter;
