import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '../../hooks/use-toast'
import { Users, Calendar, MapPin } from 'lucide-react'

const courses = [
    { id: 'web101', name: 'Web Development Fundamentals' },
    { id: 'js201', name: 'Advanced JavaScript' },
    { id: 'react301', name: 'React and Redux' },
    { id: 'node401', name: 'Backend Development with Node.js' },
    { id: 'db501', name: 'Database Design and SQL' },
]

const existingGroups = [
    { id: 1, course: 'Web Development Fundamentals', name: 'WebDev Wizards', members: 4, date: '2023-06-15', location: 'Library, Room 201' },
    { id: 2, course: 'Advanced JavaScript', name: 'JS Ninjas', members: 3, date: '2023-06-16', location: 'Online (Zoom)' },
    { id: 3, course: 'React and Redux', name: 'React Rockstars', members: 5, date: '2023-06-17', location: 'Student Center, Room 105' },
]

export default function StudyGroupFinder() {
    const toast = useToast()
    const [selectedCourse, setSelectedCourse] = useState('')
    const [groupName, setGroupName] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')

    const handleJoinGroup = (groupId) => {
        // Here you would typically send a request to join the group
        console.log('Joining group:', groupId)
        toast({
            title: "Group Joined",
            description: "You have successfully joined the study group.",
        })
    }

    const handleCreateGroup = (e) => {
        e.preventDefault()
        // Here you would typically send the new group details to your backend
        console.log('Creating group:', { selectedCourse, groupName, date, location })
        toast({
            title: "Group Created",
            description: "Your study group has been created successfully.",
        })
        setSelectedCourse('')
        setGroupName('')
        setDate('')
        setLocation('')
    }

    return (
        <Tabs defaultValue="find">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="find">Find a Group</TabsTrigger>
                <TabsTrigger value="create">Create a Group</TabsTrigger>
            </TabsList>
            <TabsContent value="find">
                <div className="space-y-4">
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="grid gap-4">
                        {existingGroups.map((group) => (
                            <Card key={group.id}>
                                <CardHeader>
                                    <CardTitle>{group.name}</CardTitle>
                                    <CardDescription>{group.course}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="flex items-center">
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>{group.members} members</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>{group.date}</span>
                                        </div>
                                        <div className="flex items-center col-span-2">
                                            <MapPin className="mr-2 h-4 w-4" />
                                            <span>{group.location}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => handleJoinGroup(group.id)}>Join Group</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="create">
                <form onSubmit={handleCreateGroup} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger id="course">
                                <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="group-name">Group Name</Label>
                        <Input
                            id="group-name"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit">Create Study Group</Button>
                </form>
            </TabsContent>
        </Tabs>
    )
}

