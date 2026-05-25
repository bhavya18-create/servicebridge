import { useState, useCallback } from 'react';

export function useNavigation({ onPageChange } = {}) {
  const [activePage, setActivePage] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const goToPage = useCallback(
    (page) => {
      setActivePage(page);
      setMobileMenuOpen(false);
      if (page !== 'Providers') {
        setSelectedCategory(null);
      }
      onPageChange?.(page);
    },
    [onPageChange],
  );

  const handleCategoryClick = useCallback(
    (category) => {
      setSelectedCategory(category);
      setActivePage('Providers');
      setMobileMenuOpen(false);
    },
    [],
  );

  return {
    activePage,
    selectedCategory,
    mobileMenuOpen,
    setMobileMenuOpen,
    goToPage,
    handleCategoryClick,
  };
}
