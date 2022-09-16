1. Идём в React-компонент и отслеживаем событие изменения
2. Пишем actionCreator, в котором отправляем fetch (этот actionCreator должен диспатчиться из React-компонента)
3. Добавляем новый actionType для этого изменения (напр. ADD_ITEM, UPDATE_ITEM)
4. Добавяем новый кейс в редьюсер для нового actionType
5. Добавляем actionCreator для нового actionType (он будет задиспатчен из actionCreator'а, который создавался на втором шаге)