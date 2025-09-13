import React, { useEffect, useMemo, useState } from "react";
import {
  FiPlus,
  FiTrash2,
  FiFileText,
  FiX,
  FiCheck,
  FiDownload,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

export default function Billing() {
  const location = useLocation();

  const [invoices, setInvoices] = useState([
    {
      id: "INV-1001",
      customer: "Rahul Sharma",
      items: [{ description: "Full Service Wash", qty: 1, rate: 2000 }],
      taxRate: 18,
      discountPercent: 5,
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
      discountPercent: 0,
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

  const [showModal, setShowModal] = useState(false);
  const [customer, setCustomer] = useState("");
  const [services, setServices] = useState([
    { id: Date.now(), description: "", qty: 1, charges: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (location.state?.fromJob) {
      setCustomer(location.state.customer || "");
      setServices(
        (location.state.services || []).map((s) => ({
          id: Date.now() + Math.random(),
          description: s.description || "",
          qty: 1,
          charges: 0,
        }))
      );
      setShowModal(true);
    }
  }, [location.state]);

  const currencyOptions = [
    { code: "USD", locale: "en-US", label: "USD - $" },
    { code: "CAD", locale: "en-CA", label: "CAD - $" },
    { code: "INR", locale: "en-IN", label: "INR - ₹" },
    { code: "EUR", locale: "de-DE", label: "EUR - €" },
    { code: "GBP", locale: "en-GB", label: "GBP - £" },
  ];
  const [currency, setCurrency] = useState(currencyOptions[1]);

  const currencyFormatter = (n) => {
    try {
      return new Intl.NumberFormat(currency.locale, {
        style: "currency",
        currency: currency.code,
        maximumFractionDigits: 2,
      }).format(Number(n) || 0);
    } catch (e) {
      return `${currency.code} ${Number(n || 0).toFixed(2)}`;
    }
  };

  const subtotal = useMemo(
    () =>
      services.reduce(
        (a, s) =>
          a +
          Number(s.qty || 0) *
            Number(isNaN(Number(s.charges)) ? 0 : Number(s.charges)),
        0
      ),
    [services]
  );

  const taxAmount = useMemo(
    () => (subtotal * Number(taxRate || 0)) / 100,
    [subtotal, taxRate]
  );

  const discountAmount = useMemo(
    () => (subtotal * Number(discountPercent || 0)) / 100,
    [subtotal, discountPercent]
  );

  const total = useMemo(
    () => subtotal + taxAmount - discountAmount,
    [subtotal, taxAmount, discountAmount]
  );

  const addService = () =>
    setServices((p) => [
      ...p,
      { id: Date.now() + Math.random(), description: "", qty: 1, charges: 0 },
    ]);
  const removeService = (id) =>
    setServices((p) => (p.length === 1 ? p : p.filter((s) => s.id !== id)));
  const updateService = (id, field, value) =>
    setServices((p) =>
      p.map((s) =>
        s.id === id
          ? {
              ...s,
              [field]: field === "description" ? value : Number(value),
            }
          : s
      )
    );

  const createBilling = () => {
    const id = `BILL-${Date.now().toString().slice(-6)}`;
    const items = services
      .filter((s) => s.description.trim() !== "" && Number(s.qty) > 0)
      .map((s) => ({
        description: s.description,
        qty: s.qty,
        rate: s.charges,
      }));

    const newInv = {
      id,
      customer: customer || "Unnamed Customer",
      items,
      taxRate,
      discountPercent,
      branding: {
        company: "AquaShine Detailing",
        address: "12 Orbit Park, Pune, MH 411001",
        logo: "https://dummyimage.com/120x40/2c3e50/ffffff.png&text=AquaShine",
      },
      status: "Draft",
      source: "billing-created",
      issuedOn: null,
      notes,
      currency: currency.code,
    };
    setInvoices((p) => [newInv, ...p]);
    setCustomer("");
    setServices([{ id: Date.now(), description: "", qty: 1, charges: 0 }]);
    setTaxRate(0);
    setDiscountPercent(0);
    setNotes("");
    setShowModal(false);
  };

  const totalsFor = (inv) => {
    const sub = inv.items.reduce(
      (a, it) => a + Number(it.qty) * Number(it.rate),
      0
    );
    const tax = (sub * Number(inv.taxRate || 0)) / 100;
    const discount = (sub * Number(inv.discountPercent || 0)) / 100;
    const total = sub + tax - discount;
    return { sub, tax, discount, total };
  };

  const counts = useMemo(
    () =>
      invoices.reduce((acc, i) => {
        acc[i.status] = (acc[i.status] || 0) + 1;
        return acc;
      }, { Draft: 0, Issued: 0, Paid: 0 }),
    [invoices]
  );

  const setStatus = (id, status) =>
    setInvoices((p) =>
      p.map((inv) => {
        if (inv.id !== id) return inv;
        if (inv.status === "Paid" && status === "Issued") {
          return inv;
        }
        return {
          ...inv,
          status,
          issuedOn:
            status === "Issued"
              ? new Date().toISOString().slice(0, 10)
              : inv.issuedOn,
        };
      })
    );

  useEffect(() => {
    document.body.style.fontFamily =
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial';
    document.body.style.backgroundColor = "#ffffff";
  }, []);

  return (
    <div className="billing-root">
      <style>{`
        :root{--accent:#00aaff;--muted:#6c757d}
        body { background-color: #ffffff; }
        .billing-root{max-width:1200px;margin:22px auto;padding:18px; background: #ffffff; }
        .header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:18px}
        .title h2{margin:0;color:var(--accent);letter-spacing:0.2px}
        .subtitle{color:var(--muted);font-size:13px;margin-top:6px}
        .controls{display:flex;gap:10px;align-items:center}
        .btn{border:none;padding:10px 14px;border-radius:10px;cursor:pointer;font-weight:700;display:inline-flex;align-items:center;gap:8px;color:var(--accent)}
        .btn.primary{background:linear-gradient(90deg,var(--accent),#00bfff);color:#fff;box-shadow:0 8px 30px rgba(0,170,255,0.12)}
        .btn.ghost{background:transparent;border:1px solid #e6eefc;color:var(--accent)}
        .panel{background:#fff;padding:16px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05); border: 1px solid #e6eefc;}
        .table-wrap{overflow-x:auto;margin-top:10px}
        table{width:100%;border-collapse:collapse;min-width:720px}
        th{background:#f7f9fc;color:var(--accent);font-weight:700;padding:12px;border-bottom:1px solid #eef2f7;text-align:left}
        td{padding:12px;border-bottom:1px solid #f3f6f9;vertical-align:top}
        .action-group{display:flex;gap:8px;flex-wrap:wrap}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1200;padding:20px}
        .modal{width:100%;max-width:980px;background:#ffffff;border-radius:14px;padding:18px;position:relative;box-shadow:0 30px 80px rgba(11,32,70,0.18);max-height:90vh;overflow-y:auto}
        .modal-header{display:flex;justify-content:space-between;align-items:center;gap:12px; margin-bottom: 16px;}
        .modal-header h3 { color: var(--accent); margin: 0; }
        .modal-body{display:grid;grid-template-columns:1fr 340px;gap:18px;margin-top:14px}
        .left{display:flex;flex-direction:column;gap:12px}
        .service-row{display:grid;grid-template-columns: 1fr 84px 1fr 48px;gap:10px;align-items:center}
        .service-row input[type="text"], .service-row input[type="number"], .job-customer, .job-notes{width:100%;padding:10px;border-radius:8px;border:1px solid #eef2f7;font-size:14px;outline:none; background: #fff; }
        .add-service{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
        .right{background:#f9fbff;padding:14px;border-radius:10px;height:fit-content}
        .right h4 { color: var(--accent); margin-top: 0; }
        .summary-row{display:flex;justify-content:space-between;padding:8px 0; border-bottom: 1px solid #f3f6f9;}
        .modal-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:16px}
        .total-bubble{background:linear-gradient(90deg,var(--accent),#00bfff);color:white;padding:12px 18px;border-radius:12px;font-weight:800;box-shadow:0 8px 28px rgba(0,170,255,0.18);display:flex;flex-direction:column;align-items:flex-end;min-width:180px; margin-top: 16px;}
        .muted{color:var(--muted);font-size:13px}
        .service-desc{font-weight:600}
        .tax-discount-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
        .tax-discount-fields input { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #eef2f7; font-size: 14px; outline: none; background: #fff; }
        
        @media (max-width:920px){
          .modal-body{grid-template-columns:1fr;gap:14px}
          .total-bubble{position:static;margin-top:12px}
        }
        @media (max-width:768px){
          .header { flex-direction: column; align-items: flex-start; }
          .controls { width: 100%; justify-content: space-between; }
          .action-group { justify-content: center; }
          .service-row{grid-template-columns:1fr 70px 1fr 40px}
          .tax-discount-fields { grid-template-columns: 1fr; }
        }
        @media (max-width:600px){
          .billing-root { padding: 12px; }
          .service-row{grid-template-columns:1fr 60px 1fr 36px; gap: 6px;}
          .service-row input { padding: 8px; font-size: 13px; }
          .btn { padding: 8px 12px; font-size: 13px; }
          .modal { padding: 12px; }
        }
        @media (max-width:480px){
          .service-row{grid-template-columns:1fr 50px 80px 36px}
          .action-group { flex-direction: column; }
          .action-group .btn { width: 100%; justify-content: center; }
        }
        @media (max-width:400px){
          .service-row{grid-template-columns:1fr 40px 70px 32px}
          .service-row input { padding: 6px; font-size: 12px; }
        }
      `}</style>

      <div className="header">
        <div className="title">
          <h2>Billing</h2>
          <p className="subtitle">Manage all invoices and bills seamlessly</p>
        </div>
        <div className="controls">
          <select
            value={currency.code}
            onChange={(e) =>
              setCurrency(
                currencyOptions.find((c) => c.code === e.target.value)
              )
            }
            style={{ padding: "10px", borderRadius: "8px", border: "1px solid #eef2f7" }}
          >
            {currencyOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <button className="btn primary" onClick={() => setShowModal(true)}>
            <FiPlus /> Create Billing
          </button>
        </div>
      </div>

      <div className="panel table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Issued On</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => {
              const t = totalsFor(inv);
              return (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.customer}</td>
                  <td>{inv.status}</td>
                  <td>{inv.issuedOn || "-"}</td>
                  <td>{currencyFormatter(t.total)}</td>
                  <td>
                    <div className="action-group">
                      <button
                        className="btn ghost"
                        onClick={() => setStatus(inv.id, "Issued")}
                        disabled={inv.status === "Paid"}
                      >
                        <FiCheck /> Issue
                      </button>
                      <button
                        className="btn ghost"
                        onClick={() => setStatus(inv.id, "Paid")}
                      >
                        <FiCheck /> Paid
                      </button>
                      <button className="btn ghost">
                        <FiDownload /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Create Billing</h3>
              <button className="btn ghost" onClick={() => setShowModal(false)}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="left">
                <input
                  className="job-customer"
                  placeholder="Customer Name"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />

                {services.map((s) => (
                  <div key={s.id} className="service-row">
                    <input
                      type="text"
                      placeholder="Service Description"
                      value={s.description}
                      onChange={(e) =>
                        updateService(s.id, "description", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      value={s.qty}
                      onChange={(e) => updateService(s.id, "qty", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Cost"
                      min="0"
                      step="0.01"
                      value={s.charges}
                      onChange={(e) =>
                        updateService(s.id, "charges", e.target.value)
                      }
                    />
                    <button
                      className="btn ghost"
                      onClick={() => removeService(s.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}

                <div className="add-service">
                  <button className="btn ghost" onClick={addService}>
                    <FiPlus /> Add Service
                  </button>
                </div>

                <div className="tax-discount-fields">
                  <div>
                    <label htmlFor="tax-rate">Tax Rate (%)</label>
                    <input
                      id="tax-rate"
                      type="number"
                      placeholder="Tax %"
                      min="0"
                      max="100"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="discount">Discount (%)</label>
                    <input
                      id="discount"
                      type="number"
                      placeholder="Discount %"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={(e) =>
                        setDiscountPercent(Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                <textarea
                  className="job-notes"
                  placeholder="Additional Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                />
              </div>

              <div className="right">
                <h4>Billing Summary</h4>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{currencyFormatter(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax ({taxRate}%):</span>
                  <span>{currencyFormatter(taxAmount)}</span>
                </div>
                <div className="summary-row">
                  <span>Discount ({discountPercent}%):</span>
                  <span>-{currencyFormatter(discountAmount)}</span>
                </div>
                <div className="total-bubble">
                  <div className="muted">TOTAL</div>
                  <div>{currencyFormatter(total)}</div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn ghost" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn primary" onClick={createBilling}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
