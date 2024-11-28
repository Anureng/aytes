import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Code, Figma, FileJson, Server } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
const route = () => {
    return (
        <>
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
                </nav>
            </header>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">Create Your Backend with Ease</h1>
                <p className="text-xl text-center mb-12">
                    Choose your preferred technology and let us handle the heavy lifting. We even convert your Figma designs into backend code!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <AlertDialog>
                        <AlertDialogTrigger asChild className="cursor-pointer">
                            <TechCard
                                title="Node.js"
                                description="Fast, event-driven backends using JavaScript."
                                icon={<Server className="h-12 w-12 mb-4 text-green-500" />}
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Welcome to the aytes</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Link href="/figma">
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <TechCard
                        title="Spring Boot"
                        description="Powerful and easily configurable Java-based framework."
                        icon={<FileJson className="h-12 w-12 mb-4 text-blue-500" />}
                    />
                    <TechCard
                        title="Java"
                        description="Robust, object-oriented language for enterprise applications."
                        icon={<Code className="h-12 w-12 mb-4 text-red-500" />}
                    />
                </div>

                <Card className="mb-12">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Figma className="h-6 w-6 text-purple-500" />
                            Figma to Backend Conversion
                        </CardTitle>
                        <CardDescription>
                            Transform your Figma designs into functional backend code
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <ListItem>Automatically generate API endpoints from your Figma designs</ListItem>
                            <ListItem>Create database schemas based on your UI components</ListItem>
                            <ListItem>Seamlessly integrate frontend and backend development workflows</ListItem>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

interface TechCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

function TechCard({ title, description, icon }: TechCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col items-center">
                    {icon}
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{children}</span>
        </li>
    )
}

export default route


