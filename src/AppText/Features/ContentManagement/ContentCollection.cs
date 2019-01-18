﻿using AppText.Features.ContentDefinition;
using AppText.Shared.Model;
using System.ComponentModel.DataAnnotations;

namespace AppText.Features.ContentManagement
{
    public class ContentCollection : IVersionable
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public ContentType ContentType { get; set; }
        public int Version { get; set; }
    }
}