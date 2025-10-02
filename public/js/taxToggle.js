

document.addEventListener('DOMContentLoaded', function() {
    const TAX_RATE = 0.18; // 18% GST
    const taxToggle = document.getElementById('switchCheckDefault');
    
    if (!taxToggle) return;
    
    const priceElements = document.querySelectorAll('.card-text');
    
    const listingsData = [];
    
    priceElements.forEach((element) => {
        const basePrice = parseInt(element.getAttribute('data-base-price'));
        
        if (!basePrice) return; 
        
        const titleElement = element.querySelector('b');
        const title = titleElement ? titleElement.textContent : '';
        
        listingsData.push({
            element: element,
            title: title,
            basePrice: basePrice
        });
    });
    
    function calculatePriceWithTax(basePrice) {
        return Math.round(basePrice * (1 + TAX_RATE));
    }
    
    function calculateTaxAmount(basePrice) {
        return Math.round(basePrice * TAX_RATE);
    }
    
    function formatPrice(price) {
        return price.toLocaleString('en-IN');
    }
    
    function updatePrices() {
        const showTotalWithTax = taxToggle.checked;
        
        listingsData.forEach((listing) => {
            let displayPrice;
            let taxInfo;
            
            if (showTotalWithTax) {
                displayPrice = calculatePriceWithTax(listing.basePrice);
                const taxAmount = calculateTaxAmount(listing.basePrice);
                
                taxInfo = `<br><small style="color: #717171;">Includes ₹${formatPrice(taxAmount)} in taxes</small>`;
            } else {
                displayPrice = listing.basePrice;
                taxInfo = '<i class="tax-info"> &nbsp;&nbsp;+18% GST</i>';
            }
            
            listing.element.innerHTML = `
                <b>${listing.title}</b> <br>
                &#x20B9;${formatPrice(displayPrice)} / night
                ${taxInfo}
            `;
        });
    }
    
    taxToggle.addEventListener('change', updatePrices);
});