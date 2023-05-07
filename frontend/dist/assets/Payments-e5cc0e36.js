import{r as s,k as $,n as S,j as e,a4 as T,Q as w,D as t,F as D,R as m,x as v,ad as x,ae as L,af as C,ag as I,ah as H,ai as A}from"./index-748315ff.js";import{A as c}from"./react-apexcharts.min-9d83f718.js";const g=s.forwardRef(({bsPrefix:a,className:r,striped:d,bordered:y,borderless:i,hover:p,size:u,variant:o,responsive:h,...f},n)=>{const l=$(a,"table"),P=S(r,l,o&&`${l}-${o}`,u&&`${l}-${u}`,d&&`${l}-${typeof d=="string"?`striped-${d}`:"striped"}`,y&&`${l}-bordered`,i&&`${l}-borderless`,p&&`${l}-hover`),b=e("table",{...f,className:P,ref:n});if(h){let _=`${l}-responsive`;return typeof h=="string"&&(_=`${_}-${h}`),e("div",{className:_,children:b})}return b});function B(a){s.useEffect(()=>{const r=document.querySelector("body"),d=document.createElement("script");return d.setAttribute("src",a),r.appendChild(d),()=>{r.removeChild(d)}},[a])}function E(a){s.useEffect(()=>{const r=document.querySelector("body"),d=document.createElement("script");return d.setAttribute("type","text/javascript"),d.innerHTML=a,r.appendChild(d),()=>{r.removeChild(d)}},[a])}function N({pendingPayments:a}){const r=()=>{E(`
      ATHM_Checkout = {
      env: "sandbox",
      publicToken: "sandboxtoken01875617264",
      timeout: 600,
      theme: "btn",
      lang: "en",
      total: ${a[0].total},
      tax: 0,
      subtotal: ${a[0].total},
      metadata1: "metadata1 test",
      metadata2: "metadata2 test",
      items: [
        {
          name: "${a[0].contract_name} Monthly Payment",
          description: "This is a description.",
          quantity: "1",
          price: ${a[0].total},
          tax: "0",
          metadata: "metadata test",
        },
      ],
      onCompletedPayment: function (response)
		 {
				 console.log(response)
		 },
      onCancelledPayment: function (response)
		 {
				 console.log(response)
		 },
      onCompletedPayment: function (response)
		 {
				 console.log(response)
		 },
    };

    `),B("https://www.athmovil.com/api/js/v3/athmovilV3.js")};return a?(r(),e("div",{id:"ATHMovil_Checkout_Button"})):e("div",{className:"no-pay-btn"})}function M(){const[a,r]=T("user",null);return e("div",{className:"payments",children:a.type==="landlord"?e(R,{user:a}):e(j,{user:a})})}function R({user:a}){const[r,d]=s.useState(null),y=async()=>{d(await x(a.landlord_id))},[i,p]=s.useState(null),u=async()=>{p(await L(a.landlord_id))},[o,h]=s.useState(null),f=async()=>{h(await C(a.landlord_id))};return s.useEffect(()=>{u(),y(),f()},[]),!r||!o?e(w,{}):t(D,{children:[t(m,{children:["Total Revenue",t("div",{className:"total",children:["$",i||0]}),e(v,{className:"invoice-btn",children:"Create Invoice +"})]}),t(c,{flush:!0,alwaysOpen:!0,children:[t(c.Item,{eventKey:"0",children:[t(c.Header,{children:["Pending Payments (",r.length,")"]}),e(c.Body,{children:e(m,{xs:"auto",children:t(g,{striped:!0,bordered:!0,hover:!0,children:[e("thead",{children:t("tr",{children:[e("th",{children:"Contract"}),e("th",{children:"Issued"}),e("th",{children:"Due"}),e("th",{children:"Late Fee"}),e("th",{children:"Amount"})]})}),e("tbody",{children:r.map((n,l)=>t("tr",{children:[e("td",{children:n.contract_name}),e("td",{children:new Date(n.date_received).toLocaleDateString()}),e("td",{children:new Date(n.date_due).toLocaleDateString()}),t("td",{children:["$",n.late_fee]}),t("td",{children:["$",n.total]})]},l))})]})})})]}),t(c.Item,{eventKey:"1",children:[t(c.Header,{children:["Payment History (",o.length,")"]}),e(c.Body,{children:e(m,{xs:"auto",children:t(g,{striped:!0,bordered:!0,hover:!0,children:[e("thead",{children:t("tr",{children:[e("th",{children:"Contract"}),e("th",{children:"Issued"}),e("th",{children:"Paid"}),e("th",{children:"Fee"}),e("th",{children:"Total"})]})}),e("tbody",{children:o.map((n,l)=>{var P=new Date(n.date_paid)>new Date(n.date_due);return t("tr",{children:[e("td",{children:n.contract_name}),e("td",{children:new Date(n.date_received).toLocaleDateString()}),e("td",{children:new Date(n.date_paid).toLocaleDateString()}),t("td",{children:["$",P?0:n.late_fee]}),t("td",{children:["$",P?n.total+n.late_fee:n.total]})]},l)})})]})})})]})]})]})}function j({user:a}){const[r,d]=s.useState(null),y=async()=>{d(await I(a.tenant_id))},[i,p]=s.useState(0),u=async()=>{p(await H(a.tenant_id))},[o,h]=s.useState(null),f=async()=>{h(await A(a.tenant_id))};return s.useEffect(()=>{u(),y(),f()},[]),!r||!o?e(w,{}):t(D,{children:[t(m,{children:["Total Pending:",t("div",{className:"total",children:["$",i||0]}),e(N,{pendingPayments:r})]}),t(c,{flush:!0,alwaysOpen:!0,children:[t(c.Item,{eventKey:"0",children:[t(c.Header,{children:["Pending Payments (",r.length,")"]}),e(c.Body,{children:e(m,{xs:"auto",children:t(g,{striped:!0,bordered:!0,hover:!0,children:[e("thead",{children:t("tr",{children:[e("th",{children:"Contract"}),e("th",{children:"Issued"}),e("th",{children:"Due"}),e("th",{children:"Fee"}),e("th",{children:"Total"})]})}),e("tbody",{children:r.map((n,l)=>t("tr",{children:[e("td",{children:n.contract_name}),e("td",{children:new Date(n.date_received).toLocaleDateString()}),e("td",{children:new Date(n.date_due).toLocaleDateString()}),e("td",{children:n.late_fee}),e("td",{children:n.total})]},l))})]})})})]}),t(c.Item,{eventKey:"1",children:[t(c.Header,{children:["Payment History (",o.length,")"]}),e(c.Body,{children:e(m,{xs:"auto",children:t(g,{striped:!0,bordered:!0,hover:!0,children:[e("thead",{children:t("tr",{children:[e("th",{children:"Contract"}),e("th",{children:"Issued"}),e("th",{children:"Due"}),e("th",{children:"Fee"}),e("th",{children:"Total"}),e("th",{children:"Paid"})]})}),e("tbody",{children:o.map((n,l)=>t("tr",{children:[e("td",{children:n.contract_name}),e("td",{children:new Date(n.date_received).toLocaleDateString()}),e("td",{children:new Date(n.date_due).toLocaleDateString()}),e("td",{children:n.late_fee}),e("td",{children:n.total}),e("td",{children:new Date(n.date_paid).toLocaleDateString()})]},l))})]})})})]})]})]})}export{M as default};
