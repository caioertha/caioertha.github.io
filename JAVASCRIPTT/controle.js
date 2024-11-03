const addBtn = document.querySelector(".btn");
const categoryList = [
    { name: "Lazer", type: "despesa" },
    { name: "Alimentação", type: "despesa" },
    { name: "Estudos", type: "despesa" },
    { name: "Pessoais", type: "despesa" },
    { name: "Saúde", type: "despesa" },
    { name: "Pet", type: "despesa" },
    { name: "Família", type: "despesa" },
    { name: "Outros", type: "despesa" },
    { name: "Salário", type: "receita" },
    { name: "Bolsa", type: "receita" },
    { name: "Mesada", type: "receita" },
    { name: "Auxílio", type: "receita" }
];

const getTypeTransactionByName = (transaction) =>
    categoryList.find(elem => elem.name.toLowerCase() === transaction.toLowerCase())?.type;

const loadCategory = (list, selector) => {
    const categoryDataList = document.querySelector(selector);
    const options = list.map(elem => `<option value="${elem.name}">`).join('');
    categoryDataList.innerHTML = options;
};

loadCategory(categoryList, "#categoryList");

const getFormValues = () => {
    const transactionName = document.querySelector("#transactionName").value;
    const amount = parseFloat(document.querySelector("#amount").value);
    const categoryName = document.querySelector("#category").value;
    const categoryType = getTypeTransactionByName(categoryName);
    const total = parseFloat(document.querySelector("#balance").textContent.substring(3));

    const updatedTotal = categoryType === "receita" ? total + amount : total - amount;

    return {
        value: amount,
        name: transactionName,
        total: updatedTotal,
        categoryName: categoryName,
        categoryType: categoryType
    };
};

const currencyToNumber = valor => parseFloat(("" + valor).substring(4));
const stringToCurrency = valor => `R$ ${valor.toFixed(2)}`;

const clearForm = () => {
    document.querySelector("#transactionName").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#category").value = "";
};

const loadBalance = () => {
    const formData = getFormValues();
    document.querySelector("#balance").textContent = stringToCurrency(formData.total);
    
    const moneySelector = formData.categoryType === "receita" ? "#money-plus" : "#money-minus";
    document.querySelector(moneySelector).textContent = stringToCurrency(formData.value);
    
    const transactionClass = formData.categoryType === "receita" ? "plus" : "minus";
    const operator = formData.categoryType === "receita" ? "+" : "-";
    
    const ulTransaction = document.querySelector(".transactions");
    ulTransaction.innerHTML += `<li class="${transactionClass}">
          ${formData.name} <span>${operator}${stringToCurrency(formData.value)}</span><button class="delete-btn">x</button>
    </li>`;

    clearForm();
};

addBtn.addEventListener("click", loadBalance);
