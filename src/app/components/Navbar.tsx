import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Figma, Zap } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="#">
                    <Figma className="h-6 w-6 mr-2" />
                    <span className="font-bold">Aytes</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Pricing
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Documentation
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                        SignUp
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Create Your Backend with Aytes
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Transform your Figma designs into a fully functional backend. No coding required.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Link href="/select">
                                    <Button>
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Link href="/test">
                                    <Button>
                                        Test Api
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button variant="outline">Learn More</Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
                    <div className="container px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
                            How It Works
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <Figma className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Design in Aytes</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Create your backend structure visually using our Figma plugin.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Zap className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">One-Click Generation</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Convert your design into a functional backend with a single click.
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Code className="h-12 w-12 mb-4 text-primary" />
                                <h3 className="text-xl font-bold mb-2">Customizable Code</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Easily modify and extend your generated backend code as needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Ready to Transform Your Workflow?
                                </h2>
                                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Join thousands of developers who are creating backends faster than ever before.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex space-x-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <Button type="submit">
                                        Sign Up
                                    </Button>
                                </form>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    By signing up, you agree to our{" "}
                                    <Link className="underline underline-offset-2" href="#">
                                        Terms & Conditions
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 FigmaBackend. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}