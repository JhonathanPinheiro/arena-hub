'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search as SearchIcon, X } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOption[];
    value: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    className?: string;
}

export function Select({
    options,
    value,
    onChange,
    placeholder = 'Selecione...',
    searchPlaceholder = 'Buscar...',
    className = '',
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const filteredOptions = useMemo(() => {
        return options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [options, search]);

    const handleSelect = (optionValue: string | null) => {
        onChange(optionValue);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div ref={containerRef} className={`relative inline-block w-64 ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-slate-900 border border-slate-800 text-slate-200 text-sm rounded-lg p-2.5 hover:border-slate-700 transition-colors cursor-pointer outline-none text-left focus:ring-2 focus:ring-blue-500"
            >
                <span className={!selectedOption ? 'text-slate-500' : 'text-slate-200'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-1 flex flex-col gap-1 max-h-72">
                    <div className="relative flex items-center border-b border-slate-800 px-2 pb-1.5 pt-1">
                        <SearchIcon className="w-4 h-4 text-slate-500 absolute left-4" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full bg-slate-950 border border-slate-800 rounded-md pl-8 pr-8 py-1.5 text-xs text-slate-200 outline-none placeholder-slate-500 focus:border-slate-700 transition-colors"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>

                    <ul className="overflow-y-auto flex-1 max-h-48 p-0 m-0 list-none scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-800 hover:scrollbar-thumb-slate-700">
                        <li>
                            <button
                                type="button"
                                onClick={() => handleSelect(null)}
                                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-left"
                            >
                                {placeholder}
                                {value === null && <Check className="w-3.5 h-3.5 text-blue-500" />}
                            </button>
                        </li>

                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
                                const isSelected = option.value === value;
                                return (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(option.value)}
                                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-md transition-colors text-left ${isSelected
                                                ? 'bg-blue-600/10 text-blue-400 font-medium'
                                                : 'text-slate-200 hover:bg-slate-800'
                                                }`}
                                        >
                                            {option.label}
                                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-500" />}
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="px-3 py-3 text-xs text-slate-500 text-center">
                                Nenhum jogo encontrado
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}