## 下拉刷新功能
1. ScrollTop
2. 鼠标事件：touchstart，touchmove，touchend
3. y的偏移量
4. 最大偏移量

## 实现无限滚动

1. document.documentElement.clientHeight 根节点的高度
2. document.body.scrollHeight body 内容高度
3. document.documentElement.scrollTop 滑动条距离顶部的高度
4. scrollTop + clientHeight = scrollHeight 触底条件
5. offset 偏移量
6. scrollTop + clientHeight >= scrollHeight - offset 触发条件

## 按照商品的门店距离做排序

1. createQueryBuilder 自定义SQL查询
2. ST_Distance 计算两个地理对象之间的最短距离
3. ST_GeomFromText 把文本表示形式转换为地理对象
4. getRawAndEntities 获取自定义查询的结果

## 距离计算的两个拓展问题

1. 坐标转换问题
2. 性能优化问题 （先缩小范围再去排序）geohash