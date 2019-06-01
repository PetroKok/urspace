import React from 'react'
import routes_urls from "../helpers/routes_urls";
import ModalImage from 'react-modal-image'

export default class PreviewFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [
                {
                    type: 'video',
                    icon: 'fa-video'
                },
                {
                    type: 'word',
                    icon: 'fa-file-word'
                },
                {
                    type: 'plain',
                    icon: 'fa-file-alt'
                },
                {
                    type: 'presentationml',
                    icon: 'fa-file-powerpoint'
                },
                {
                    type: 'audio',
                    icon: 'fa-file-audio'
                },
            ]
        };
    }

    render() {
        const {file} = this.props;
        let pictureTag = undefined;
        let preview = undefined;
        let defaultPreview = <a href={`${file.src}`} className="ml-3">{file.name}</a>;


        if (file.type.includes('image')) {
            return (
                <span key={file.id}>
                    <ModalImage
                        id={file.id}
                        small={routes_urls.IMAGE + file.src}
                        large={routes_urls.IMAGE + file.src}
                        alt={`${file.name}, size: ${((file.size / 1024) / 1024).toFixed(2)} MB`}
                        height="25"
                    />
                    <a href="#" className="ml-3">{file.name}</a>
                </span>
            );
        }
        ;

        this.state.types.map((item, key) => {
            file.type.includes(item.type) ? pictureTag = <i className={`fas ${item.icon} custom-fa`}/> : null;
            file.type.includes(item.type) ? preview =
                <a href={`${file.src}`} className="ml-3">{file.name}</a> : defaultPreview;
        });

        return pictureTag === undefined ? (
            <span>
                <i className="fas fa-file custom-fa"/>
                <a href="#" className="ml-3">{file.name}</a>
            </span>
        ) : (
            <span>
                {pictureTag}
                {preview}
            </span>
        );

    }
}