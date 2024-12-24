import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from '../../hooks/use-toast'

export default function EmailForm() {
    const toast = useToast()
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [department, setDepartment] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the email using an API
        console.log('Sending email:', { subject, message, department })
        toast({
            title: "Email Sent",
            description: "Your message has been sent to the institute.",
        })
        setSubject('')
        setMessage('')
        setDepartment('')
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="finance">Financial Services</SelectItem>
                    <SelectItem value="it">IT Support</SelectItem>
                </SelectContent>
            </Select>
            <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
            />
            <Textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <Button type="submit">Send Email</Button>
        </form>
    )
}

