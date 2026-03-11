
import "../styles/fees.css";

function Fees() {
  const feesSummary = {
    total: 50000,
    paid: 38000,
    outstanding: 12000,
  };

  const paymentHistory = [
    { date: "2026-01-15", amount: 15000, method: "M-Pesa", status: "Paid" },
    { date: "2026-02-10", amount: 12000, method: "Bank Transfer", status: "Paid" },
    { date: "2026-03-05", amount: 12000, method: "Pending", status: "Pending" },
  ];

  return (
    <div className="fees-container">

      <h2>Fee Summary</h2>

      {/* Summary Cards */}
      <div className="fees-summary-grid">
        <div className="fees-card">
          <h4>Total Fees</h4>
          <p className="amount">KES {feesSummary.total.toLocaleString()}</p>
        </div>
        <div className="fees-card paid">
          <h4>Paid</h4>
          <p className="amount">KES {feesSummary.paid.toLocaleString()}</p>
        </div>
        <div className="fees-card outstanding">
          <h4>Outstanding</h4>
          <p className="amount">KES {feesSummary.outstanding.toLocaleString()}</p>
        </div>
      </div>

      {/* Payment History */}
      <div className="payment-history">
        <h3>Payment History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, i) => (
              <tr key={i}>
                <td>{payment.date}</td>
                <td>KES {payment.amount.toLocaleString()}</td>
                <td>{payment.method}</td>
                <td className={payment.status.toLowerCase()}>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pay Fees Button */}
      <div className="pay-fees-btn">
        <button>Pay Outstanding Fees</button>
      </div>

    </div>
  );
}

export default Fees;