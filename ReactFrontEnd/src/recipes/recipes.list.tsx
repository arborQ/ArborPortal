import * as React from "react";
import data from "./data";
import {descriptions, urls} from "./changeData";

var descriptionsData = descriptions;

const autoFix = true;

function noDescriptionItems(items: any[]): any[] {
    return items
    .filter(i => !i.NEWITEM.LONGTEXT.some(d => d.longtext) || i.NEWITEM.ATTACHMENTS.length == 0);
}

function noImagesItems(items: any[]): any[] {
    return items
    .filter(i => i.NEWITEM.ATTACHMENTS.length == 0);
}

function noLongTextItems(items: any[]): any[] {
    return items
    .filter(i => !i.NEWITEM.LONGTEXT.some(d => d.longtext));
}

function noDescription(items: any[]): number {
    return noDescriptionItems(items)
    .length;
}

export default class RecipesListComponent extends React.Component {

    componentWillMount() {
        var smallData = {
            ...data,
            Items: [
                ...data.Items.filter(i => i.NEWITEM.EXT_PRODUCT_ID == '2004425')
            ]
        }

        this.setState({
            data
        });
    }

    fixLongText(): void {
        this.setState({
            data: {
                Items: [
                    ...this.state.data.Items.map(i =>{
                        var mappingItem = descriptionsData.find(a => a.code == i.NEWITEM.EXT_PRODUCT_ID);

                        var newItem = !mappingItem ? i.NEWITEM.LONGTEXT : [{
                            languageCode: "NO",
                            longtext: mappingItem.description.trim()
                        }];

                 

                        return {
                            NEWITEM: {
                                ...i.NEWITEM,
                                LONGTEXT: this.noLongText(newItem, 'Produktet har ingen beskrivelse'),
                                EXT_SCHEMA_TYPE : 'UNSPSC-TOOLS_NO'
                            }
                        };
                    })
                ],
            }
        });
    }
    
    noLongText(items: any[], longtext: string): any {
        if (!autoFix) {
            return items;
        }

        return [
            ...items.map(i => {
                if (!i.longtext) {
                    return {...i, longtext };
                } else {
                    return i;
                }
            });
        ];
    }

    noImage(attachments: any[]): any[] {
        if (!autoFix) {
            return attachments;
        }

        if ( attachments.length === 0) {
            return [
                {
                    "fileName": `https://tools.no/Content/Assets/img/no-image.png`,
                    "mimeType": "image/jpeg",
                    "type": "01",
                    "descriptions": [
                        {
                            "description": "FrontImage",
                            "languageCode": "NO"
                        }
                    ] 
                  }
            ];
        }

        return attachments;
        // /Content/Assets/img/no-image.png
    }

    fixImages(): void {
        this.setState({
            data: {
                Items: [
                    ...this.state.data.Items.map(i =>{
                        var mappingUrl = urls.find(a => a.code == i.NEWITEM.EXT_PRODUCT_ID);

                        var attachments = !mappingUrl ? i.NEWITEM.ATTACHMENTS : [
                            {
                                "fileName": mappingUrl.description,
                                "mimeType": "image/jpeg",
                                "type": "01",
                                "descriptions": [
                                    {
                                        "description": "FrontImage",
                                        "languageCode": "NO"
                                    }
                                ] 
                              }
                        ];

                        return {
                            NEWITEM: {
                                ...i.NEWITEM,
                                ATTACHMENTS: this.noImage(attachments)
                            }
                        };
                    })
                ],
            }
        });
    }
    
    fix(): void {
       this.fixImages();
       this.fixLongText();
    }

    render() {
        return (
            <div>
                <div>
                    <a download="10003855-KEMIRA CHEMICALS.json" href={`data:text/plain;charset=utf-8, ${encodeURIComponent(JSON.stringify({ ...data, Items: this.state.data.Items }, undefined, 2))}`}>Download</a>
                </div>
            <div style={{display: "flex"}}>
                <div>
                    <button onClick={this.fixLongText.bind(this)}>Fix descriptions {noLongTextItems(this.state.data.Items).length}</button>
                    <pre>{JSON.stringify(noLongTextItems(this.state.data.Items).map(e => e.NEWITEM.EXT_PRODUCT_ID), undefined, 2)}</pre>
                </div>
                <div>
                    <button onClick={this.fixImages.bind(this)}>Fix images {noImagesItems(this.state.data.Items).length}</button>
                    <pre>{JSON.stringify(noImagesItems(this.state.data.Items).map(e => e.NEWITEM.EXT_PRODUCT_ID), undefined, 2)}</pre>
                </div>
                <div>
                    <button onClick={this.fix.bind(this)}>Fix all {noDescription(this.state.data.Items)}</button>
                    <pre>{JSON.stringify(noDescriptionItems(this.state.data.Items).map(e => e.NEWITEM.EXT_PRODUCT_ID), undefined, 2)}</pre>
                </div>
               
            </div>
            <div>
                <pre>{JSON.stringify({ ...data, Items: this.state.data.Items }, undefined, 2)}</pre>
            </div>
            </div>
        );
    }
}