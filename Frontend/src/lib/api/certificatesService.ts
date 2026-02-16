import api from '@/lib/api';

export interface Certificate {
    id: number;
    courseId: string;
    courseName: string;
    instructor: string;
    completedDate: Date;
    credentialId: string;
    thumbnail: string;
    skills: string[];
    issueDate: Date;
}

export const certificatesService = {
    async getMyCertificates(): Promise<Certificate[]> {
        const response = await api.get('/certificates');
        return response.data;
    },

    async getCertificateById(id: number): Promise<Certificate> {
        const response = await api.get(`/certificates/${id}`);
        return response.data;
    },

    async downloadCertificate(id: number): Promise<any> {
        const response = await api.get(`/certificates/${id}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },
};
