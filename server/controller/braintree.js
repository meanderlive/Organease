var braintree = require("braintree");
require("dotenv").config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

class brainTree {
  ganerateToken(req, res) {
    // Bypass Braintree: always return a static token
    return res.json({ clientToken: "static-client-token", success: true });
  }

  paymentProcess(req, res) {
    // Simulate payment process
    const { simulateStatus } = req.body;
    if (simulateStatus === "success") {
      return res.json({
        success: true,
        transaction: {
          id: "static-transaction-id",
          amount: req.body.amountTotal || 0,
        },
        message: "Payment successful (simulated).",
      });
    } else if (simulateStatus === "failed") {
      return res.json({
        success: false,
        error: "Payment failed (simulated).",
      });
    } else {
      return res.json({
        success: false,
        error: "Payment pending or unknown status (simulated).",
      });
    }
  }
}

const brainTreeController = new brainTree();
module.exports = brainTreeController;
