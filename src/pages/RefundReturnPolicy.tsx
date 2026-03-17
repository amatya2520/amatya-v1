import PolicyPage from "@/components/policy/PolicyPage"
import PolicySection from "@/components/policy/PolicySection"

const RefundReturnPolicy = () => {
  return (
    <PolicyPage title="Refund &amp; Cancellation Policy">
      <div className="space-y-6">
        <PolicySection title="Refund and cancellation policy">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>Once an order is confirmed, AMATYA will not accept return or refund requests.</p>
            <p>However, in any of the below situations, we are more than happy to work with our patrons to find an amicable solution that is fair to all parties.</p>

            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="text-xl font-semibold text-primary md:text-2xl">IN CASE OF DAMAGED PRODUCT</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>We will be happy to re send and replace the product and it will take 7 to 10 days, AMATYA needs to be notified of damaged product within 2 days from delivery date via email to <a className="font-medium text-primary underline underline-offset-4" href="mailto:amatya2520@mail.com">[amatya2520@mail.com](mailto:amatya2520@mail.com)</a>.</li>
                <li>In the email, order number, image of invoice, 1 outer box image, 2 clear images &amp; we also need unboxing videos of damaged products to be sent.</li>
                <li>In case of multiple item shipments, only the affected product can be returned and replaced.</li>
                <li>We will be happy to re-send and replace the product(s) promptly and we will work with you on providing an amicable solution. Email will be responded to within 24-48 hrs and full assistance will be provided thereafter.</li>
              </ul>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="text-xl font-semibold text-primary md:text-2xl">IN CASE OF MISSING PRODUCT</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>AMATYA needs to be notified of missing product within 2 days from delivery date via email to <a className="font-medium text-primary underline underline-offset-4" href="mailto:amatya2520@mail.com">[amatya2520@mail.com](mailto:amatya2520@mail.com)</a></li>
                <li>In the email, order number, image of the invoice, 1 outer box image, 2 clear images of the opened box &amp; unboxing video with all items received to be sent.</li>
                <li>We will be unable to accept a refund request. But, we will be happy to promptly re-send the missing product.</li>
                <li>Email will be responded to within 24-48 hrs and full assistance will be provided thereafter.</li>
              </ul>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="text-xl font-semibold text-primary md:text-2xl">IN CASE OF SPOILED PRODUCT</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>AMATYA needs to be notified of spoilage of product within 2 days from delivery date via email to <a className="font-medium text-primary underline underline-offset-4" href="mailto:amatya2520@mail.com">[amatya2520@mail.com](mailto:amatya2520@mail.com)</a></li>
                <li>In the email, order number, date of packaging/ date of manufacture, clear images or video of the product to be shared.</li>
                <li>We will be unable to accept returns due to variance in taste, texture, colour or aroma. This is because our products are completely natural and made mostly by hand so no two batches will be identical.</li>
                <li>No compromise is made in the natural production process, use of best and natural ingredients and we will ensure that maximum nutritional value is retained We will work with you on providing an amicable solution.</li>
                <li>Product will be replaced after due investigation and diligence and we assure a fair outcome at all times.</li>
                <li>Email will be responded to within 24-48 hrs, and full assistance will be provided thereafter.</li>
              </ul>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="text-xl font-semibold text-primary md:text-2xl">EXCHANGE OR RETURNS ARE PERMISSIBLE UNDER THE FOLLOWING CIRCUMSTANCES:</h2>
              <ol className="list-decimal pl-6 space-y-2 text-foreground">
                <li>The product is damaged, or you have received the incorrect item.</li>
                <li>The product's seal is broken upon delivery.</li>
                <li>The product has expired before its delivery.</li>
                <li>No items would be returned or refunded if they are bought in sale period or belongs to gifting category.</li>
                <li>Any order-related discrepancies must be reported within 48 hours of delivery, along with a complete unboxing video for verification.</li>
              </ol>
              <p>If your return meets the criteria, we will arrange for the item to be picked up from the same address. You will receive notification regarding the expected pick-up date.</p>
              <p>For exchanges, the replacement product will be delivered to you within 3-7 days after the return pick-up is completed.</p>
            </div>

            <div className="border-t border-border pt-6 space-y-3">
              <h2 className="text-xl font-semibold text-primary md:text-2xl">CANCELLATION:</h2>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>An order cancellation request will be accepted only if we have not yet shipped the product.</li>
                <li>If a cancellation request is accepted, you are entitled to get a refund of the entire amount.</li>
                <li>Amatya reserves the right to cancel or refuse to accept any order placed for various reasons, including but not limited to the non-availability of stock, pricing errors, informational errors or problems identified with the personal/financial details provided by the customer.</li>
              </ul>
            </div>

            <p>
              For any questions regarding returns, feel free to contact us at{" "}
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="mailto:amatya2520@gmail.com"
              >
                [amatya2520@gmail.com](mailto:amatya2520@gmail.com)
              </a>
            </p>
          </div>
        </PolicySection>
      </div>
    </PolicyPage>
  );
};

export default RefundReturnPolicy;
