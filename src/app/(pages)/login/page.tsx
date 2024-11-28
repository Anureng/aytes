'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'
import { Figma } from 'lucide-react'

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch('https://aytes-backend.onrender.com/createUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                throw new Error(errorResponse.message || 'Signup failed')
            }

            // Redirect or handle success
            router.push('/dashboard')
        } catch {
            alert("ERROR")
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const response = await fetch('https://aytes-backend.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorResponse = await response.json()
                throw new Error(errorResponse.message || 'Login failed')
            }

            const result = await response.json()
            // Store token or handle login success
            localStorage.setItem('AytesToken', result.token)
            router.push('/select')
        } catch {
            alert("ERROR")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <Link className="flex items-center justify-center" href="/">
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
            <Card className="w-[350px] mx-auto mt-10">
                <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>Login or create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="signup">
                            <form onSubmit={handleSignup}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? 'Signing up...' : 'Sign Up'}
                                    </Button>
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                    <div className="mt-6">
                        <Separator />
                        <p className="text-center text-sm text-gray-600 mt-2">Or continue with</p>
                        <Button
                            variant="outline"
                            className="w-full mt-2"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </CardFooter>
            </Card>
        </>
    )
}
