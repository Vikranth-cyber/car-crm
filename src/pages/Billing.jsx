import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiDownload,
  FiCheckCircle,
  FiXCircle,
  FiFileText,
} from "react-icons/fi";

export default function Billing() {
  const [invoices, setInvoices] = useState([
    {
      id: "INV-1001",
      customer: "Rahul Sharma",
      items: [{ description: "Full Service Wash", qty: 1, rate: 2000 }],
      taxRate: 18,
      branding: {
        company: "AquaShine Detailing",
        address: "12 Orbit Park, Pune, MH 411001",
        logo: "https://dummyimage.com/120x40/2c3e50/ffffff.png&text=AquaShine",
      },
      status: "Paid",
      source: "manual",
      issuedOn: "2025-08-01",
    },
    {
      id: "INV-1002",
      customer: "Priya Verma",
      items: [{ description: "Interior Cleaning", qty: 1, rate: 1500 }],
      taxRate: 18,
      branding: {
        company: "AquaShine Detailing",
        address: "12 Orbit Park, Pune, MH 411001",
        logo: "https://dummyimage.com/120x40/2c3e50/ffffff.png&text=AquaShine",
      },
      status: "Draft",
      source: "manual",
      issuedOn: null,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, rate: 0 }]);
  const [taxRate, setTaxRate] = useState(18);
  const [branding, setBranding] = useState({
    company: "AquaShine Detailing",
    address: "12 Orbit Park, Pune, MH 411001",
    logo: "https://dummyimage.com/120x40/2c3e50/ffffff.png&text=AquaShine",
  });

  const currency = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(Number(n) || 0);

  const totalsFor = (inv) => {
    const sub = inv.items.reduce(
      (a, it) => a + Number(it.qty) * Number(it.rate),
      0
    );
    const tax = (sub * Number(inv.taxRate)) / 100;
    const total = sub + tax;
    return { sub, tax, total };
  };

  const counts = useMemo(() => {
    return invoices.reduce(
      (acc, i) => {
        acc[i.status] = (acc[i.status] || 0) + 1;
        return acc;
      },
      { Draft: 0, Issued: 0, Paid: 0, Void: 0 }
    );
  }, [invoices]);

  const resetForm = () => {
    setCustomer("");
    setItems([{ description: "", qty: 1, rate: 0 }]);
    setTaxRate(18);
  };

  const addItem = () =>
    setItems((p) => [...p, { description: "", qty: 1, rate: 0 }]);

  const removeItem = (idx) =>
    setItems((p) => p.filter((_, i) => i !== idx));

  const updateItem = (idx, field, value) =>
    setItems((p) =>
      p.map((it, i) => (i === idx ? { ...it, [field]: value } : it))
    );

  const createInvoice = () => {
    const id = `INV-${Date.now().toString().slice(-6)}`;
    const newInv = {
      id,
      customer: customer || "Unnamed Customer",
      items: items.filter((i) => i.description && Number(i.qty) > 0),
      taxRate: Number(taxRate) || 0,
      branding: { ...branding },
      status: "Draft",
      issuedOn: null,
    };
    setInvoices((p) => [newInv, ...p]);
    setShowForm(false);
    resetForm();
  };

  const setStatus = (id, status) => {
    setInvoices((p) =>
      p.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status,
              issuedOn:
                status === "Issued"
                  ? new Date().toISOString().slice(0, 10)
                  : inv.issuedOn,
            }
          : inv
      )
    );
  };

  const exportPDF = (inv) => {
    const { sub, tax, total } = totalsFor(inv);
    const html = `
      <html>
      <head><title>${inv.id} - Invoice</title></head>
      <body><h2>${inv.branding.company} - Invoice</h2></body>
      </html>
    `;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20, background: "#fff" }}>
      <div style={{ marginBottom: 20, padding: 20, borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, color: "#007bff" }}>Billing & Invoices</h2>
            <div style={{ color: "#7f8c8d", marginTop: 6, fontSize: 14 }}>
              Draft: {counts.Draft} • Issued: {counts.Issued} • Paid: {counts.Paid} • Void: {counts.Void}
            </div>
          </div>
          <button
            style={btn("#007bff")}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            <FiPlus /> Create Invoice
          </button>
        </div>

        {showForm && (
          <div style={{ marginTop: 20, border: "1px solid #eef2f7", borderRadius: 12, padding: 20 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="Customer Name"
                style={input}
              />
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="Tax Rate %"
                style={input}
              />
              {items.map((it, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 8 }}>
                  <input
                    value={it.description}
                    onChange={(e) => updateItem(i, "description", e.target.value)}
                    placeholder="Description"
                    style={input}
                  />
                  <input
                    type="number"
                    value={it.qty}
                    onChange={(e) => updateItem(i, "qty", e.target.value)}
                    placeholder="Qty"
                    style={input}
                  />
                  <input
                    type="number"
                    value={it.rate}
                    onChange={(e) => updateItem(i, "rate", e.target.value)}
                    placeholder="Rate"
                    style={input}
                  />
                  <button style={btn("#e74c3c")} onClick={() => removeItem(i)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button style={btn("#2ecc71")} onClick={addItem}>
                <FiPlus /> Add Item
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={btn("#6c757d")} onClick={() => setShowForm(false)}>Cancel</button>
                <button style={btn("#007bff")} onClick={createInvoice}>Save Draft</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: 20, borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.08)", background: "#fff" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr>
                {["Invoice", "Customer", "Amount", "Tax", "Total", "Status", "Actions"].map((h, i) => (
                  <th key={i} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => {
                const { sub, tax, total } = totalsFor(inv);
                return (
                  <tr key={inv.id}>
                    <td style={cell}>{inv.id}</td>
                    <td style={cell}>{inv.customer}</td>
                    <td style={cell}>{currency(sub)}</td>
                    <td style={cell}>{currency(tax)}</td>
                    <td style={{ ...cell, fontWeight: 700 }}>{currency(total)}</td>
                    <td style={cell}>{inv.status}</td>
                    <td style={cell}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {inv.status === "Draft" && (
                          <button style={btn("#2980b9")} onClick={() => setStatus(inv.id, "Issued")}>
                            <FiFileText /> Issue
                          </button>
                        )}
                        {inv.status !== "Paid" && (
                          <button style={btn("#2ecc71")} onClick={() => setStatus(inv.id, "Paid")}>
                            <FiCheckCircle /> Paid
                          </button>
                        )}
                        {inv.status !== "Void" && (
                          <button style={btn("#e74c3c")} onClick={() => setStatus(inv.id, "Void")}>
                            <FiXCircle /> Void
                          </button>
                        )}
                        <button style={btn("#6c757d")} onClick={() => exportPDF(inv)}>
                          <FiDownload /> PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {invoices.length === 0 && (
                <tr>
                  <td style={cell} colSpan={7}>
                    No invoices yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const btn = (bg) => ({
  background: bg,
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: 10,
  cursor: "pointer",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 6,
});

const input = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e1e5ea",
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
};

const th = {
  textAlign: "left",
  background: "#f7f9fc",
  color: "#007bff",
  fontWeight: 700,
  padding: "12px 12px",
  borderBottom: "1px solid #eef2f7",
};

const cell = {
  padding: "12px 12px",
  borderBottom: "1px solid #f0f3f7",
  verticalAlign: "top",
};
