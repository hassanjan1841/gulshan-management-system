import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from '../../hooks/use-toast'

export default function IdCardUpdate() {
    const toast = useToast()
    const [file, setFile] = useState()

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (file) {
            // Here you would typically upload the file to your server
            console.log('Uploading file:', file.name)
            toast({
                title: "Photo Uploaded",
                description: "Your new ID card photo has been submitted for review.",
            })
            setFile()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
            </div>
            {file && (
                <div className="mt-4">
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="max-w-xs mx-auto rounded-lg shadow-md"
                    />
                </div>
            )}
            <Button type="submit" disabled={!file}>
                Upload New Photo
            </Button>
        </form>
    )
}

