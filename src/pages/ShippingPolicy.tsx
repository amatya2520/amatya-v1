import PolicyPage from "@/components/policy/PolicyPage"
import PolicySection from "@/components/policy/PolicySection"

const ShippingPolicy = () => {
  return (
    <PolicyPage title="Shipping Policy">
      <div className="space-y-6">
        <PolicySection title="Amatya Shipping Policy">
          <div className="space-y-3 leading-relaxed text-foreground">
            <p>Please note that the free shipping policy will apply only if specified so as part of promotional campaigns or special offers.</p>
            <p className="font-semibold">Please note our shipping policies as below</p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed text-foreground">
              <li>A complete postal address including pin code, email id and contact number is essential to help us ship your order.</li>
              <li>Kindly cross-check your pin-code and contact number before you complete your order.</li>
              <li>A complete postal address including pin code, email id and contact number is essential to help us ship your order.</li>
              <li>Kindly cross-check your pin-code and contact number before you complete your order.</li>
              <li>If the ordered item is in stock, it will be packed and dispatched from our warehouse within 3-5 working days.</li>
              <li>However if some of the ordered items are not in stock, then we will get them produced as soon as possible. We will keep you informed under such circumstances.</li>
              <li>Amatya collaborates with multiple courier partners for shipping across India.</li>
              <li>We only have standard shipping available at the moment.</li>
              <li>Depending on the location, it takes 2-9 days to be delivered.</li>
              <li>Our courier partners will be able to deliver the shipment to you between Monday to Saturday.</li>
              <li>Working days exclude public holidays and Sundays.</li>
              <li>Delivery time is subject to factors beyond our control including unexpected travel delays from our courier partners and transporters due to weather conditions and strikes.</li>
              <li>Amatya reserves the right to cancel an order within 48 hours from the time of order.</li>
              <li>
                For any further clarifications, please contact us at{" "}
                <a
                  className="font-medium text-primary underline underline-offset-4"
                  href="mailto:amatya2520@mail.com"
                >
                  [amatya2520@mail.com](mailto:amatya2520@mail.com)
                </a>
                .
              </li>
            </ul>
          </div>
        </PolicySection>
      </div>
    </PolicyPage>
  );
};

export default ShippingPolicy;
