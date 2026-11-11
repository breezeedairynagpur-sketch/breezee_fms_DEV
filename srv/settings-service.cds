 

   
service SettingsService {

    entity AppSettings {
        key id           : Integer;
        setting_group    : String(100);
        setting_key      : String(100);
        setting_value    : LargeString;
        value_type       : String(30);
        setting_label    : String(255);
        description      : String(500);
        is_public        : Integer;
        sort_order       : Integer;
        updated_by       : String(100);
        created_at       : Timestamp;
        updated_at       : Timestamp;
    };

}
 