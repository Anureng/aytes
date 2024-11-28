'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Send } from 'lucide-react'

export default function Component() {
    const [url, setUrl] = useState('')
    const [method, setMethod] = useState('GET')
    const [body, setBody] = useState('')
    const [headers, setHeaders] = useState('')
    const [auth, setAuth] = useState('')
    const [response, setResponse] = useState('')
    const [responseHeaders, setResponseHeaders] = useState({})
    const [responseTime, setResponseTime] = useState(null)
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setResponse('')
        setResponseHeaders({})
        setResponseTime(null)
        setStatus(null)

        try {
            const startTime = performance.now()

            const options: RequestInit = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...JSON.parse(headers || '{}'),
                    ...(auth ? { 'Authorization': `Bearer ${auth}` } : {})
                },
            }

            if (method !== 'GET' && method !== 'HEAD') {
                options.body = body
            }

            const res = await fetch(url, options)
            const endTime = performance.now()

            setResponseTime(endTime - startTime)
            setStatus(res.status)
            setResponseHeaders(Object.fromEntries(res.headers.entries()))

            const data = await res.json()
            setResponse(JSON.stringify(data, null, 2))
        } catch (error: any) {
            setResponse(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Advanced API Tester</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Request</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="flex-grow">
                                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                                        API Endpoint
                                    </label>
                                    <Input
                                        id="url"
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://api.example.com/endpoint"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="method" className="block text-sm font-medium text-gray-700">
                                        Method
                                    </label>
                                    <Select value={method} onValueChange={setMethod}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a request method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="GET">GET</SelectItem>
                                            <SelectItem value="POST">POST</SelectItem>
                                            <SelectItem value="PUT">PUT</SelectItem>
                                            <SelectItem value="PATCH">PATCH</SelectItem>
                                            <SelectItem value="DELETE">DELETE</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Tabs defaultValue="body">
                                <TabsList>
                                    <TabsTrigger value="body">Body</TabsTrigger>
                                    <TabsTrigger value="headers">Headers</TabsTrigger>
                                    <TabsTrigger value="auth">Auth</TabsTrigger>
                                </TabsList>
                                <TabsContent value="body">
                                    <Textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder="Enter JSON body here"
                                        rows={5}
                                    />
                                </TabsContent>
                                <TabsContent value="headers">
                                    <Textarea
                                        value={headers}
                                        onChange={(e) => setHeaders(e.target.value)}
                                        placeholder="Enter headers as JSON"
                                        rows={5}
                                    />
                                </TabsContent>
                                <TabsContent value="auth">
                                    <Input
                                        type="text"
                                        value={auth}
                                        onChange={(e) => setAuth(e.target.value)}
                                        placeholder="Enter Bearer token"
                                    />
                                </TabsContent>
                            </Tabs>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send Request'}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {status && (
                            <div className="mb-4">
                                <Badge variant={status < 400 ? 'success' : 'destructive'}>
                                    Status: {status}
                                </Badge>
                                {responseTime && (
                                    <Badge variant="secondary" className="ml-2">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {responseTime.toFixed(2)} ms
                                    </Badge>
                                )}
                            </div>
                        )}
                        <Tabs defaultValue="body">
                            <TabsList>
                                <TabsTrigger value="body">Body</TabsTrigger>
                                <TabsTrigger value="headers">Headers</TabsTrigger>
                            </TabsList>
                            <TabsContent value="body">
                                <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-96">
                                    <code>{response || 'No response yet'}</code>
                                </pre>
                            </TabsContent>
                            <TabsContent value="headers">
                                <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto max-h-96">
                                    <code>{JSON.stringify(responseHeaders, null, 2) || 'No headers yet'}</code>
                                </pre>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>API Testing Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Always check the API documentation for correct endpoints and parameters.</li>
                            <li>Use appropriate HTTP methods (GET for fetching, POST for creating, etc.).</li>
                            <li>Include necessary headers like Content-Type and Authorization.</li>
                            <li>Test both successful and error scenarios.</li>
                            <li>Validate the response format and content.</li>
                            <li>Consider rate limiting and API usage quotas.</li>
                            <li>Handle errors gracefully in your application.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}