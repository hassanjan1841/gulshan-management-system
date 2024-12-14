import AllCertificateCard from "./AllCertificatecard";
import CertificateCard from "./CertificateCard";

// Mock data for certificates
const certificates = [
  {
    id: 1,
    title: "React Developer Certification",
    issueDate: "December 15, 2024",
    description: "Certification for proficiency in React development",
    status: "active",
    expirationDate: "December 15, 2026",
    issuer: "React Certification Board",
    credentialID: "RCB-2024-12345",
  },
  {
    id: 2,
    title: "Database Design Certification",
    issueDate: "November 20, 2024",
    description: "Certification for expertise in database design and management",
    status: "active",
    expirationDate: "November 20, 2026",
    issuer: "Database Professionals Association",
    credentialID: "DPA-2024-67890",
  },
  {
    id: 3,
    title: "API Development Certification",
    issueDate: "October 5, 2024",
    description: "Certification for proficiency in API development and integration",
    status: "pending",
    expirationDate: null,
    issuer: "API Developers Institute",
    credentialID: "ADI-2024-54321",
  },
  {
    id: 4,
    title: "UI/UX Design Certification",
    issueDate: "September 1, 2023",
    description: "Certification for expertise in UI/UX design principles and practices",
    status: "expired",
    expirationDate: "September 1, 2024",
    issuer: "Design Professionals Association",
    credentialID: "DPA-2023-98765",
  },
];

export default function StudentCertificate() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Certificates</h1>
      <div className="flex flex-wrap gap-6">
        {certificates.map((certificate) => (
          <AllCertificateCard
            key={certificate.id}
            title={certificate.title}
            issueDate={certificate.issueDate}
            description={certificate.description}
            status={certificate.status}
            expirationDate={certificate.expirationDate}
            issuer={certificate.issuer}
            credentialID={certificate.credentialID}
          />
        ))}
      </div>
    </div>
  );
}

