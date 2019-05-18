<?php

return [
    'locale' => 'uk',

    'url_prefix' => env('ADMIN_PREFIX', 'admin'),

    /*
     * Form Builder
     */
    'form_builder' => [
        'fields' => [
            'text' => [
                'attributes' => [
                    'class' => 'mdl-textfield__input'
                ],
                'wrapper' => true,
                'wrapperAttributes' => [
                    'class' => 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width'
                ],
                'labelAttributes' => [
                    'class' => 'mdl-textfield__label'
                ],
            ],
            'select' => [
                'attributes' => [
                    'class' => 'form-control select2'
                ],
                'wrapper' => true,
                'wrapperAttributes' => [
                    'class' => 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width'
                ],
                'labelAttributes' => [
                    'class' => 'mdl-textfield__label'
                ],
            ],
            'toggle' => [
                'attributes' => [
                    'class' => 'mdl-switch__input'
                ],
                'wrapper' => true,
                'wrapperAttributes' => [
                    'class' => 'inline-block'
                ],
                'labelAttributes' => [
                    'class' => 'toggle-label'
                ],
                'checkboxLabelAttributes' => [
                    'class' => 'mdl-switch mdl-js-switch mdl-js-ripple-effect'
                ]
            ]
        ]
    ]
];