import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How do I reset my student portal password?",
        answer: "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address."
    },
    {
        question: "Where can I find my class schedule?",
        answer: "Your class schedule is available in the 'Academics' section of the student portal. Click on 'Class Schedule' to view your current courses and timings."
    },
    {
        question: "How do I apply for financial aid?",
        answer: "To apply for financial aid, visit the 'Financial Services' section in the student portal. Click on 'Apply for Aid' and follow the application process. Make sure to submit all required documents."
    },
    {
        question: "Can I change my major?",
        answer: "Yes, you can change your major. Schedule an appointment with your academic advisor through the 'Appointments' section to discuss your options and the process for changing majors."
    },
    {
        question: "How do I access my transcripts?",
        answer: "Official transcripts can be requested through the 'Records' section of the student portal. Click on 'Request Transcript' and follow the instructions. Please note that there may be a fee for official transcripts."
    }
]

export default function FAQSection() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

