import React, { useEffect, useState } from 'react';

const BranchesList = () => {
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                const data = await response.json();
                setBranches(data);
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        fetchBranches();
    }, []);

    return (
        <ul>
            {branches.map(branch => (
                <li key={branch.branchID}>{branch.name}</li> // Adjust based on your data structure
            ))}
        </ul>
    );
};

export default BranchesList;
