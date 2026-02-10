import React from 'react';
import { FaBox, FaCrow, FaBug, FaPaw, FaTint } from 'react-icons/fa';
import '../../styles/CategoryTabs.css';

const CategoryTabs = ({ user, selectedCategory, onSelectCategory }) => {
    // Only render if user is admin or has access to all
    if (!(user?.role === 'admin' || user?.specialty === 'all')) {
        return null;
    }

    return (
        <div className="category-tabs">
            <div
                className={`category-tab tab-all ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => onSelectCategory('all')}
            >
                <div className="tab-icon-circle"><FaBox /></div>
                <label>TODOS</label>
            </div>
            <div
                className={`category-tab tab-aves ${selectedCategory === 'aves' ? 'active' : ''}`}
                onClick={() => onSelectCategory('aves')}
            >
                <div className="tab-icon-circle"><FaCrow /></div>
                <label>AVES</label>
            </div>
            <div
                className={`category-tab tab-reptiles ${selectedCategory === 'reptiles' ? 'active' : ''}`}
                onClick={() => onSelectCategory('reptiles')}
            >
                <div className="tab-icon-circle"><FaBug /></div>
                <label>REPTILES</label>
            </div>
            <div
                className={`category-tab tab-mamiferos ${selectedCategory === 'mamiferos' ? 'active' : ''}`}
                onClick={() => onSelectCategory('mamiferos')}
            >
                <div className="tab-icon-circle"><FaPaw /></div>
                <label>MAMÍFEROS</label>
            </div>
            <div
                className={`category-tab tab-anfibios ${selectedCategory === 'anfibios' ? 'active' : ''}`}
                onClick={() => onSelectCategory('anfibios')}
            >
                <div className="tab-icon-circle"><FaTint /></div>
                <label>ANFIBIOS</label>
            </div>
        </div>
    );
};

export default CategoryTabs;
