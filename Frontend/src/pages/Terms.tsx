import MarketingLayout from "@/components/marketing/MarketingLayout";

export default function Terms() {
  return (
    <MarketingLayout>
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-neutral max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using LearnAI's services, you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms,
                you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed">
                Permission is granted to temporarily access the materials on LearnAI's website for
                personal, non-commercial transitory viewing only. This is the grant of a license,
                not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password.
                You agree to accept responsibility for all activities that occur under your account.
                You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Course Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Instructors retain ownership of their course content. By uploading content to LearnAI,
                you grant us a non-exclusive license to host, display, and distribute your content
                to enrolled students. You warrant that you have the right to share all content you upload.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. AI Features</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our AI features are provided as-is to assist with learning and course creation.
                AI-generated content should be reviewed for accuracy. We are not responsible for
                any errors or omissions in AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Payments and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Course purchases are subject to our refund policy. Subscription fees are billed
                in advance and are non-refundable except as required by law. We reserve the right
                to change our pricing at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice or liability,
                for any reason, including breach of these Terms. Upon termination, your right to use
                the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms, please contact us at legal@learnai.com.
              </p>
            </section>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
