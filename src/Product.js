import { useState } from "react";

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function Product() {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <>
            <SearchBar
                filterText={filterText}
                inStockOnly={inStockOnly}
                onFilterTextChange={setFilterText}
                onInStockOnlyChange={setInStockOnly}
            />
            <ProductTable
                products={PRODUCTS}
                filterText={filterText}
                inStockOnly={inStockOnly}
            />
        </>
    );
}

function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange}) {
    return (
        <form className="flex flex-col items-center">
            <input
                type="text"
                name="search"
                value={filterText}
                placeholder="Search..."
                className="my-4 border border-black border-opacity-100 rounded px-2"
                onChange={(e) => {
                    onFilterTextChange(e.target.value)
                }}
            />
            <label className="mb-4">
                <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => {
                        onInStockOnlyChange(e.target.checked)
                    }}
                />
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function ProductTable({products, filterText, inStockOnly}) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }

        if (inStockOnly && !product.stocked) {
            return;
        }

        const category = product.category;
        if (category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={category}
                    key={category}
                />
            );
        }

        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );

        lastCategory = category;
    });

    return (
        <table className="flex flex-col items-center">
            <thead>
                <tr className="flex gap-28">
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function ProductCategoryRow({category}) {
    return (
        <tr className="flex justify-center">
            <th>{category}</th>
        </tr>
    );
}

function ProductRow({product, key}) {
    const name = product.stocked ? product.name :
        <span className="text-red-500">
            {product.name}
        </span>

    return (
        <tr key={key} className="flex justify-between gap-20">
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}