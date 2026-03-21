import PolicyPage from "@/components/policy/PolicyPage"
import PolicySection from "@/components/policy/PolicySection"

const PrivacyPolicy = () => {
  return (
    <PolicyPage title="Privacy Policy">
      <div className="space-y-6">
        <PolicySection title="Privacy Policy">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our AMATYA Website.</p>
          </div>
        </PolicySection>

        <PolicySection title="PERSONAL INFORMATION WE COLLECT">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>
            <p>Additionally, when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. We refer to this information as “Order Information”.</p>
            <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
          </div>
        </PolicySection>

        <PolicySection title="HOW DO WE USE YOUR PERSONAL INFORMATION?">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to:</p>
          </div>
        </PolicySection>

        <PolicySection title="DISCLOSURE">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>
          </div>
        </PolicySection>

        <PolicySection title="COMMUNICATE WITH YOU">
          <div className="space-y-4 leading-relaxed text-foreground">
            <ul className="list-disc space-y-2 pl-6">
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
            <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
          </div>
        </PolicySection>

        <PolicySection title="SHARING YOUR PERSONAL INFORMATION">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>We share your Personal Information with third parties to help us use your Personal Information, as described above.</p>
            <p>For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here:</p>
            <p>
              <a className="font-medium text-primary underline underline-offset-4" href="https://www.shopify.com/legal/privacy" target="_blank" rel="noreferrer">
                https://www.shopify.com/legal/privacy
              </a>
            </p>
            <p>We also use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here:</p>
            <p>
              <a className="font-medium text-primary underline underline-offset-4" href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noreferrer">
                https://www.google.com/intl/en/policies/privacy/
              </a>
            </p>
            <p>You can also opt-out of Google Analytics here:</p>
            <p>
              <a className="font-medium text-primary underline underline-offset-4" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
            <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
            <p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
            <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
            <p>In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
            <p>Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.</p>
            <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
            <p>We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>
            <p>You hereby expressly agree to receive communication (including transactional messages) by way of SMS/RCS (Rich Communication Services) and/or email or through WhatsApp from the Company or any third party in connection with the Services or your registration on the Platform.</p>
            <p>We may contact you telephonically or through emails to introduce new product/service offerings and in case you do not want us to contact you, you are requested to actively opt out.</p>
          </div>
        </PolicySection>

        <PolicySection title="DO NOT TRACK">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>
          </div>
        </PolicySection>

        <PolicySection title="YOUR RIGHTS">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>You have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
          </div>
        </PolicySection>

        <PolicySection title="DATA RETENTION">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
          </div>
        </PolicySection>

        <PolicySection title="CHANGES TO THIS PRIVACY POLICY">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.</p>
          </div>
        </PolicySection>

        <PolicySection title="CONTACT US">
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at:</p>
            <p>
              <a className="font-medium text-primary underline underline-offset-4" href="mailto:amatya2520@gmail.com">
                [amatya2520@gmail.com](mailto:amatya2520@gmail.com)
              </a>
            </p>
          </div>
        </PolicySection>
      </div>
    </PolicyPage>
  );
};

export default PrivacyPolicy;
