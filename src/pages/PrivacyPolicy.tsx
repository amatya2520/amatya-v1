import Layout from '@/components/layout/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="container max-w-3xl py-16 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl font-bold">Privacy Policy - Amatya</h1>
        </div>

        <div className="space-y-4">
          <p>Privacy Policy - Amatya</p>

          <p>
            At Amatya, your privacy is our priority. We are committed to protecting your personal information and using it responsibly.
          </p>

          <div className="space-y-2">
            <p className="font-semibold">1. Information We Collect</p>
            <p>Name, contact details, and address for order processing</p>
            <p>Payment information (securely processed via trusted gateways)</p>
            <p>Feedback, inquiries, or support messages</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">2. How We Use Your Information</p>
            <p>To process and deliver orders efficiently</p>
            <p>To enhance customer experience and product quality</p>
            <p>To send updates, offers, and service notifications</p>
            <p>For legal and verification purposes</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">3. Data Protection</p>
            <p>Your information is securely stored and never sold or shared with third parties.</p>
            <p>Payment details are encrypted and processed through secure systems.</p>
            <p>Only authorized personnel can access customer data.</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">4. User Rights</p>
            <p>Customers can request updates, corrections, or deletion of their information.</p>
            <p>You may opt-out of promotional communications anytime.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
