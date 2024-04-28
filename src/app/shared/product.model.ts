export class Product {
    constructor(
        public product_name: string,
        public link_word: string,
        public product_price: number,
        public off_price: number,
        public product_description: string,
        public final_price: number,
        public dominant_color: string,
        public type: string,
        public main_img?: string,
        public second_img?: string,
        public third_img?: string,
        public fourth_img?: string,
        public fifth_img?: string,
        public input_pairs?: Array<any>
    ) {}
}
// ამ შემთხვევაში firebase db ვერ მიკითხავს blob ვერსიას input ისას ამიტომ იძულებული ვარ რომ წავაკითხინო string ვერსია რაც სრულიად აზრს უცვლის ამ
// შემთხვევაში რადგან შემდგომში fetcing ის დროს ვერ მოვახერხებთ ამ img ების output ს მაგრამ აზრი მისახვედრია და სტრუქტურაც როგორც კეთდება 
// და რადგან back არ მიწყობს ხელს ზუსტად ჩანაფიქრში რა პროექტიც იყო ვერ გამოვა მაგრამ ინფორმაციის მიმოცვლა და გადატან გადმოტანა ჩვეულებრივად მოხერხდება
// ასევე ვაპირებ ფოტოდან საშუალო ფერის გმოთვლის სისტემის ინტეგრაციას რაც შესაძლებელია რადგან ფოტოს option ში ვლოგავ საიდანაც კოდს შესაძლებლობა ექნება
// პიქსელებს დააკვირდეს და საშუალო ფერი მაინც დავლოგო db ში.