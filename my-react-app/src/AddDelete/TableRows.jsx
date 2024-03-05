import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import "font-awesome/css/font-awesome.min.css";

function TableRows({rowsData, deleteTableRows, handleChange}) {

    const calculateTotalSum = () => {
        let totalSum = 0;
    
        rowsData.forEach((data, index) => {
          const { paymentMo, includeDTI, balance, rate } = data;
    
          if (includeDTI) {
            const numericPaymentMo = parseFloat(paymentMo.replace(/[^\d.]/g, ''));
            const numericBalance = parseFloat(balance.replace(/[^\d.]/g, ''));
            const numericRate = parseFloat(rate.replace(/[^\d.]/g, ''));
    
            if (isNaN(numericPaymentMo) || isNaN(numericBalance) || isNaN(numericRate)) {
              alert(`Payment, balance, and rate are required for row ${index + 1}`);
              return;
            }
    
            totalSum += numericPaymentMo;
          }
        });
    
        return totalSum;
      };
    return(
        <>
        {rowsData.map((data, index)=>{
            const {creditType, companyName, paymentMo, balance, rate, expiration, isChecked, includeDTI}= data;
            return(

                <tr key={index}>
                {/* <td>
               <input type="text" value={creditType} onChange={(evnt)=>(handleChange(index, evnt))} name="fullName" className="form-control"/>
                </td> */}
                <td>
            {/* Dropdown for creditType */}
            <select
              value={creditType}
              onChange={(evnt) => handleChange(index, evnt)}
              name="creditType"
              className="form-control"
            >
              <option value="">Select Credit Type</option>
              <option value="Car loan">Car loan</option>
              <option value="Home loan">Home loan</option>
            </select>
          </td>
                <td><input type="text" value={companyName}  onChange={(evnt)=>(handleChange(index, evnt))} name="companyName" className="form-control"/> </td>
                <td>
            {/* Payment input with default "$" and formatted value */}
            <input
              type="text"
              value={paymentMo ? `$${parseInt(paymentMo.replace(/\D/g, ""), 10).toLocaleString("en-US")}` : "$"}
              onChange={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d]/g, '');
                const formattedValue = `$${parseInt(numericValue, 10).toLocaleString("en-US")}`;
                handleChange(index, {
                  target: {
                    name: "paymentMo",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
              name="paymentMo"
              className="form-control"
              onBlur={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d]/g, '');
                const formattedValue = `$${parseInt(numericValue, 10).toLocaleString("en-US")}`;
                handleChange(index, {
                  target: {
                    name: "paymentMo",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
            />
          </td>
          <td>
            {/* Balance input with default "$" and formatted value */}
            <input
              type="text"
              value={balance ? `$${parseInt(balance.replace(/\D/g, ""), 10).toLocaleString("en-US")}` : "$"}
              onChange={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d]/g, '');
                const formattedValue = `$${parseInt(numericValue, 10).toLocaleString("en-US")}`;
                handleChange(index, {
                  target: {
                    name: "balance",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
              name="balance"
              className="form-control"
              onBlur={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d]/g, '');
                const formattedValue = `$${parseInt(numericValue, 10).toLocaleString("en-US")}`;
                handleChange(index, {
                  target: {
                    name: "balance",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
            />
          </td>
          <td>
            {/* Rate input with default "%" and formatted value */}
            <input
              type="text"
              value={rate ? `${parseFloat(rate).toLocaleString("en-US")}%` : ""}
              onChange={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d.]/g, ''); // Allow numeric and dot characters
                const formattedValue = `${parseFloat(numericValue).toLocaleString("en-US")}%`;
                handleChange(index, {
                  target: {
                    name: "rate",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
              name="rate"
              className="form-control"
              onBlur={(evnt) => {
                const numericValue = evnt.target.value.replace(/[^\d.]/g, ''); // Allow numeric and dot characters
                const formattedValue = `${parseFloat(numericValue).toLocaleString("en-US")}%`;
                handleChange(index, {
                  target: {
                    name: "rate",
                    value: numericValue !== "" ? formattedValue : "",
                  },
                });
              }}
            />
          </td>
                <td>
            {/* Date picker for expiration with calendar icon */}
            <div className="input-group">
              <DatePicker
                selected={expiration}
                onChange={(date) => handleChange(index, { target: { name: "expiration", value: date } })}
                className="form-control"
              />
              <span className="input-group-addon">
  <i className="fa fa-calendar"></i>
</span>
            </div>
          </td>
          <td>
              {/* Checkbox input for DTI */}
              <input
                type="checkbox"
                checked={includeDTI}
                onChange={() => {
                  handleChange(index, {
                    target: {
                      name: "includeDTI",
                      value: !includeDTI,
                    },
                  });
                }}
              />
            </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(index))}>x</button></td>
            </tr>

            )
        })
    }
    {/* Display total sum */}
    <tr>
        <td colSpan="7">
          <strong>Estimated Debts(Mo): Total:${calculateTotalSum()}</strong>
        </td>
      </tr>
   </>
    )
    
    
}

export default TableRows;