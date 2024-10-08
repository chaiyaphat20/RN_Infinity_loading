# ตัวอย่างการใช้งาน FlatList ใน React Native

โปรเจกต์นี้เป็นตัวอย่างการใช้งาน `FlatList` ใน React Native สำหรับแสดงรายการผู้ใช้ โดย `FlatList` ถูกตั้งค่าให้รองรับการเลื่อนหน้าจอเพื่อโหลดข้อมูลเพิ่มเติมแบบไม่สิ้นสุด และมีตัวบ่งชี้การโหลดข้อมูลที่ด้านล่างของรายการ

## คุณสมบัติ

- แสดงรายการผู้ใช้พร้อมคีย์เฉพาะสำหรับแต่ละรายการ
- รองรับการเลื่อนหน้าจอเพื่อโหลดข้อมูลเพิ่มเติมเมื่อผู้ใช้เลื่อนไปถึงจุดสิ้นสุดของรายการ
- สามารถกำหนดคอมโพเนนต์ Footer เพื่อแสดงตัวบ่งชี้การโหลดข้อมูลขณะที่กำลังดึงข้อมูลเพิ่มเติม

## ภาพรวมของ Props ที่ใช้ใน FlatList

ด้านล่างนี้เป็นภาพรวมของ `props` ที่สำคัญที่ใช้ในคอมโพเนนต์ `FlatList`:

### `data`

- **ประเภท:** `Array`
- **คำอธิบาย:** `data` เป็น prop ที่ใช้ส่งข้อมูลที่ต้องการแสดงในลิสต์ โดยในตัวอย่างนี้ `users` คืออาเรย์ที่มีข้อมูลของผู้ใช้ (`ResultUser`) ที่จะถูกแสดงในรายการ

### `renderItem`

- **ประเภท:** `(item: ListRenderItemInfo<ResultUser>) => JSX.Element`
- **คำอธิบาย:** ฟังก์ชันที่ใช้ในการกำหนดวิธีการแสดงแต่ละรายการ (`item`) ใน `FlatList` ฟังก์ชันนี้จะรับข้อมูลรายการเดียวและเรนเดอร์ออกมาในรูปแบบของ JSX

### `keyExtractor`

- **ประเภท:** `(item: ResultUser) => string`
- **คำอธิบาย:** ฟังก์ชันที่ใช้ในการระบุค่าคีย์ (key) สำหรับแต่ละรายการในลิสต์ โดยในตัวอย่างนี้จะใช้ `email` ของผู้ใช้เป็นคีย์ ซึ่งจะช่วยให้ React จัดการรายการในลิสต์ได้อย่างมีประสิทธิภาพ

### `ListFooterComponent`

- **ประเภท:** `React.ComponentType<any> | React.ReactElement | null`
- **คำอธิบาย:** prop นี้ใช้กำหนดคอมโพเนนต์ที่จะถูกแสดงที่ส่วนล่างของลิสต์ (footer) ในตัวอย่างนี้จะใช้ `renderLoader` ซึ่งสามารถเป็นตัวบ่งชี้การโหลดข้อมูล (เช่น สปินเนอร์) หรือคอมโพเนนต์อื่น ๆ ตามที่ต้องการ

### `onEndReached`

- **ประเภท:** `() => void`
- **คำอธิบาย:** ฟังก์ชันที่จะถูกเรียกใช้เมื่อผู้ใช้เลื่อนมาถึงจุดสิ้นสุดของลิสต์ โดยในตัวอย่างนี้จะเรียกใช้ฟังก์ชัน `loadMoreItem` เพื่อโหลดข้อมูลเพิ่มเติมเข้ามาในลิสต์

### `onEndReachedThreshold`

- **ประเภท:** `number`
- **คำอธิบาย:** กำหนดค่าจุดที่ฟังก์ชัน `onEndReached` จะถูกเรียกใช้ โดยในตัวอย่างนี้กำหนดเป็น `0` หมายความว่าฟังก์ชันจะถูกเรียกเมื่อเลื่อนมาถึงจุดสิ้นสุดของลิสต์พอดี