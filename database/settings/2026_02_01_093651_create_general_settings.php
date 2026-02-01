<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.headoffice', '');
        $this->migrator->add('general.registration', '');
        $this->migrator->add('general.taxpayer_number', '');

        $this->migrator->add('general.phone', '');
        $this->migrator->add('general.email', '');
        $this->migrator->add('general.address', '');

        $this->migrator->add('general.facebook_url', '');
        $this->migrator->add('general.twitter_url', '');
        $this->migrator->add('general.instagram_url', '');
        $this->migrator->add('general.linkedin_url', '');
        $this->migrator->add('general.youtube_url', '');
    }
};
