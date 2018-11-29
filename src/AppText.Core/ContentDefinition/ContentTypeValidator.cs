﻿using AppText.Core.Shared.Validation;
using AppText.Core.Storage;
using System;
using System.Threading.Tasks;

namespace AppText.Core.ContentDefinition
{
    public class ContentTypeValidator : Validator<ContentType>
    {
        private readonly IApplicationStore _applicationStore;
        private readonly IContentDefinitionStore _contentDefinitionStore;

        public ContentTypeValidator(IApplicationStore applicationStore, IContentDefinitionStore contentDefinitionStore)
        {
            _applicationStore = applicationStore;
            _contentDefinitionStore = contentDefinitionStore;
        }

        protected override async Task ValidateCustom(ContentType objectToValidate)
        {
            // Verify app reference
            if (! String.IsNullOrEmpty(objectToValidate.AppId))
            {
                var app = await _applicationStore.GetApp(objectToValidate.AppId);
                if (app == null)
                {
                    AddError(new ValidationError { Name = "AppId", ErrorMessage = "AppText:AppNotFound", Parameters = new[] { objectToValidate.AppId } } );
                }
            }
            else {
                AddError(new ValidationError { Name = "App", ErrorMessage = "AppText:AppIdEmpty" } );
            }

            // Duplicate content type name
            if (objectToValidate.Id == null)
            {
                if ((await _contentDefinitionStore.GetContentTypes(new ContentTypeQuery { AppId = objectToValidate.AppId, Name = objectToValidate.Name })).Length > 0)
                {
                    AddError(new ValidationError { Name = "Name", ErrorMessage = "AppText:DuplicateContentTypeName", Parameters = new[] { objectToValidate.Name } });
                }
            }
        }
    }
}
