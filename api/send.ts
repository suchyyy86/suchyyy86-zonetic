import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, email, message, service, company, phone } = req.body;

            const { data, error } = await resend.emails.send({
                from: 'Zonetic Contact Form <onboarding@resend.dev>', // Keep this until domain verification
                to: ['mariuszsuchanek@gmail.com'], // Replace with your actual email
                subject: `New Contact Form Submission | ${name}`,
                html: `
          <h1>New Inquiry from Zonetic Web</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <hr />
          <h3>Message:</h3>
          <p>${message}</p>
        `,
            });

            if (error) {
                return res.status(400).json({ error });
            }

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
