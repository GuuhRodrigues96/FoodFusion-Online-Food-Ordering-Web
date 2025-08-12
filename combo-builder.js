document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os grupos de opções
    const optionGroups = document.querySelectorAll('.option-group');
    const totalPriceElement = document.getElementById('total-price');
    const comboImageElement = document.getElementById('combo-image');
    
    // Define preços iniciais (tudo 0)
    const selectedPrices = {
        main: 0,
        side: 0,
        drink: 0
    };

    // Define imagens iniciais
    const selectedImages = {
        main: '',
        side: '',
        drink: ''
    };

    // Função para atualizar o preço total
    const updateTotalPrice = () => {
        let total = selectedPrices.main + selectedPrices.side + selectedPrices.drink;
        totalPriceElement.textContent = `₹${total.toFixed(2)}`;
    };

    // Função para atualizar a imagem do combo
    const updateComboImage = () => {
        // Lógica simples para atualizar a imagem. 
        // Você pode ter uma imagem padrão ou uma imagem que combine as partes.
        // Neste exemplo, vamos mostrar a imagem do prato principal.
        if (selectedImages.main) {
            comboImageElement.src = selectedImages.main;
        } else {
            // Imagem placeholder se nada for selecionado
            comboImageElement.src = 'https://via.placeholder.com/350'; 
        }
    };

    // Adiciona um listener de evento para cada grupo de opções
    optionGroups.forEach(group => {
        const inputRadios = group.querySelectorAll('input[type="radio"]');
        inputRadios.forEach(radio => {
            radio.addEventListener('change', (event) => {
                const selectedItem = event.target.closest('.option-item');
                
                // Remove a classe 'selected' de todos os itens do grupo
                group.querySelectorAll('.option-item').forEach(item => {
                    item.classList.remove('selected');
                });
                
                // Adiciona a classe 'selected' ao item clicado
                selectedItem.classList.add('selected');

                // Obtém o tipo de item (main, side, drink) e seus dados
                const type = event.target.name;
                const price = parseFloat(selectedItem.dataset.price);
                const image = selectedItem.dataset.image;

                // Atualiza os preços e imagens selecionados
                selectedPrices[type] = price;
                selectedImages[type] = image;

                // Chama as funções para atualizar a UI
                updateTotalPrice();
                updateComboImage();
            });
        });
    });

    // Lógica para o botão "Adicionar ao Carrinho" (exemplo)
    const addToCartButton = document.querySelector('.btn-add-to-cart');
    addToCartButton.addEventListener('click', () => {
        if (selectedPrices.main > 0 && selectedPrices.side > 0 && selectedPrices.drink > 0) {
            alert('Combo adicionado ao carrinho! Preço total: ' + totalPriceElement.textContent);
            // Aqui você pode adicionar a lógica para realmente adicionar ao carrinho
        } else {
            alert('Por favor, selecione um item de cada categoria para montar o combo.');
        }
    });

    // Inicializa a página com o preço e a imagem corretos (início em 0)
    updateTotalPrice();
    updateComboImage();
});