export interface ReadingModes {
        text: boolean;
        image: boolean;
    }

export interface ImageLinks {
        smallThumbnail: string;
        thumbnail: string;
    }

export interface PanelizationSummary {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
    }

export interface VolumeInfo {
        title: string;
        subtitle: string;
        authors: string[];
        publisher: string;
        publishedDate: string;
        description: string;
        readingModes: ReadingModes;
        maturityRating: string;
        allowAnonLogging: boolean;
        contentVersion: string;
        imageLinks: ImageLinks;
        previewLink: string;
        infoLink: string;
        canonicalVolumeLink: string;
        panelizationSummary: PanelizationSummary;
    }

export interface ListPrice {
        amount: number;
        currencyCode: string;
    }

export interface RetailPrice {
        amount: number;
        currencyCode: string;
    }

export interface Offer {
        finskyOfferType: number;
        listPrice: any;
        retailPrice: any;
        giftable: boolean;
    }

export interface SaleInfo {
        country: string;
        listPrice: ListPrice;
        retailPrice: RetailPrice;
        buyLink: string;
        offers: Offer[];
    }

export interface Epub {
        isAvailable: boolean;
        acsTokenLink: string;
    }

export interface Pdf {
        isAvailable: boolean;
        acsTokenLink: string;
    }

export interface AccessInfo {
        country: string;
        epub: Epub;
        pdf: Pdf;
        accessViewStatus: string;
    }

export interface SearchInfo {
        textSnippet: string;
    }

export interface Item {
        kind: string;
        id: string;
        etag: string;
        selfLink: string;
        volumeInfo: VolumeInfo;
        saleInfo: SaleInfo;
        accessInfo: AccessInfo;
        searchInfo: SearchInfo;
    }

export interface BooksRoot {
        kind: string;
        totalItems: number;
        items: Item[];
    }

export interface MyBook {
    id: string;
    read: boolean;
}    

