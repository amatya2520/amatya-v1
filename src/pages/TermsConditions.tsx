import Layout from '@/components/layout/Layout';

const TermsConditions = () => {
  return (
    <Layout>
      <section className="container max-w-3xl py-16 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl font-bold">Terms &amp; Conditions - Amatya</h1>
        </div>

        <div className="space-y-4">
          <p>Terms &amp; Conditions - Amatya</p>

          <div className="space-y-2">
            <p className="font-semibold">1. Product Information</p>
            <p>All product details, ingredients, and descriptions are accurate.</p>
            <p>Slight variation in color, aroma, or texture may occur due to natural production.</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">2. Order Confirmation</p>
            <p>Orders are confirmed only after successful payment.</p>
            <p>Cash on Delivery (COD) availability depends on the delivery location.</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">3. Pricing &amp; Payment</p>
            <p>Prices may change without prior notice</p>
            <p>Secure online payment gateways are used for all transactions</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">4. Usage</p>
            <p>Products are natural; check for personal allergies before use</p>
            <p>Amatya is not responsible for misuse or improper storage</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">5. Compliance</p>
            <p>Operations comply with FSSAI guidelines and legal regulations</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">7. Ethical Business Conduct</p>
            <p>Amatya follows all FSSAI guidelines, food safety laws, and government regulations.</p>
            <p>We promote fair trade, honesty, and respectful partnerships with all farmers and suppliers.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsConditions;
