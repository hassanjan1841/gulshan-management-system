import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import EmailForm from './EmailFor,'
import CourseRegistration from './CourseRegistration'
import FAQSection from './faqs'
import IdCardUpdate from './IdCardUpdate'
import StudyGroupFinder from './StudyGroup'


export default function StudentServices() {
    const [activeTab, setActiveTab] = useState("email")

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Student Services</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="id-card">ID Card</TabsTrigger>
                    <TabsTrigger value="course-registration">Course Registration</TabsTrigger>
                    <TabsTrigger value="studygroup">Group Study</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    <TabsContent value="email">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Institute</CardTitle>
                                <CardDescription>Send an email to the institute administration</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <EmailForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="id-card">
                        <Card>
                            <CardHeader>
                                <CardTitle>Update ID Card Picture</CardTitle>
                                <CardDescription>Change your ID card photo</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <IdCardUpdate />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="course-registration">
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Registration</CardTitle>
                                <CardDescription>Register for new courses or view your current schedule</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CourseRegistration />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="studygroup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Group Study </CardTitle>
                                <CardDescription>find your partner for Group Study</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <StudyGroupFinder />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="faq">
                        <Card>
                            <CardHeader>
                                <CardTitle>Frequently Asked Questions</CardTitle>
                                <CardDescription>Find answers to common questions</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FAQSection />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}

